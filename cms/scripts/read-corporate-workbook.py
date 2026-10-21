"""Read approved Corporate service copy without executing workbook instructions."""

import json
import posixpath
import sys
import xml.etree.ElementTree as ET
import zipfile


NS = {"s": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
FIELDS = {
    "B": "heroDescription",
    "C": "definition",
    "D": "documentation",
    "E": "eligibility",
    "F": "process",
    "G": "audience",
}
HEADERS = {
    "B": "Service Overview",
    "C": "What is ---- ? (Need Full Definition)",
    "D": "Documentation",
    "E": "Eligibility Criteria",
    "F": "Step-by-Step Process",
    "G": "Who Needs",
}
CATEGORIES = {
    "MCA Services", "Import Export Service", "Government License & Certification",
    "IPR Services", "FSSAI", "SEBI Business Registration", "Tax and Accounting",
    "Labour Compliance", "Fund Raising",
}


def read_workbook(filename):
    with zipfile.ZipFile(filename) as archive:
        strings = []
        if "xl/sharedStrings.xml" in archive.namelist():
            strings = [
                "".join(node.itertext())
                for node in ET.fromstring(archive.read("xl/sharedStrings.xml")).findall("s:si", NS)
            ]
        workbook = ET.fromstring(archive.read("xl/workbook.xml"))
        sheet = next((s for s in workbook.findall("s:sheets/s:sheet", NS)
                      if s.attrib["name"] == "Corporate"), None)
        if sheet is None:
            raise ValueError("The workbook must contain the Corporate sheet.")
        relations = ET.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
        target = next(r.attrib["Target"] for r in relations
                      if r.attrib["Id"] == sheet.attrib[f"{{{REL}}}id"])
        sheet_path = target.lstrip("/") if target.startswith("/") else posixpath.normpath("xl/" + target)
        rows = ET.fromstring(archive.read(sheet_path)).findall("s:sheetData/s:row", NS)
        category = None
        services = []
        counts = {}
        headers_checked = False
        for row in rows:
            values = {}
            for cell in row.findall("s:c", NS):
                column = "".join(c for c in cell.attrib["r"] if c.isalpha())
                value = cell.find("s:v", NS)
                if cell.attrib.get("t") == "inlineStr":
                    inline = cell.find("s:is", NS)
                    text = "".join(inline.itertext()) if inline is not None else ""
                else:
                    text = value.text or "" if value is not None else ""
                    if cell.attrib.get("t") == "s" and text:
                        text = strings[int(text)]
                if text.strip():
                    values[column] = text.strip()
            if row.attrib["r"] == "1":
                if any(values.get(column) != header for column, header in HEADERS.items()):
                    raise ValueError("Unexpected Corporate sheet column headers.")
                headers_checked = True
                continue
            if "A" not in values:
                continue
            if not any(column in values for column in FIELDS):
                category = values["A"]
                if category != "Company Registration" and category not in CATEGORIES:
                    raise ValueError(f"Unknown service category: {category}")
                continue
            if category == "Company Registration":
                continue
            if category not in CATEGORIES:
                raise ValueError(f"Missing category at Excel row {row.attrib['r']}")
            missing = [column for column in FIELDS if not values.get(column)]
            if missing:
                raise ValueError(f"Missing columns {missing} at Excel row {row.attrib['r']}")
            index = counts.get(category, 0)
            services.append({
                "category": category, "title": values["A"],
                "excelRow": int(row.attrib["r"]), "sortOrder": index,
                **{field: values[column] for column, field in FIELDS.items()},
            })
            counts[category] = index + 1
        if not headers_checked or not services:
            raise ValueError("No Corporate service rows were found.")
        return services


if __name__ == "__main__":
    try:
        json.dump(read_workbook(sys.argv[1]), sys.stdout, ensure_ascii=False)
    except (ValueError, KeyError, OSError, zipfile.BadZipFile, ET.ParseError) as error:
        sys.exit(str(error))
