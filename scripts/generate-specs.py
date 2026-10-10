"""Regenerate checked-in reference PDFs from the browser's specification registry.

Maintenance tool: Python 3 + ReportLab. Website builds use the saved PDFs and
do not need Python or ReportLab.
"""
import json
import subprocess
from html import escape
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parent.parent
registry = json.loads(subprocess.check_output([
    "node", "--input-type=module", "-e",
    "import {specifications} from './src/specifications.js'; console.log(JSON.stringify([...specifications.values()]));"
], cwd=ROOT, text=True))
pdfmetrics.registerFont(TTFont("SpecSans", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
styles = getSampleStyleSheet()
for style in styles.byName.values():
    style.fontName = "SpecSans"
styles["BodyText"].fontSize = 9
styles["BodyText"].leading = 14
styles["Heading1"].textColor = colors.HexColor("#3b6ea5")


def paragraph(text, style="BodyText"):
    return Paragraph(escape(str(text)), styles[style])


def table(fields):
    rows = [[paragraph(key), paragraph(value)] for key, value in fields.items()]
    result = Table(rows, colWidths=[145, 360], hAlign="LEFT")
    result.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#f5f1e9")),
        ("LINEBELOW", (0, 0), (-1, -1), .4, colors.HexColor("#d6d1c7")),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    return result


for spec in registry:
    destination = ROOT / "public" / spec["pdf"]
    destination.parent.mkdir(parents=True, exist_ok=True)
    document = SimpleDocTemplate(str(destination), pagesize=A4, leftMargin=45, rightMargin=45,
                                 topMargin=40, bottomMargin=40, title=f'{spec["family"]} — {spec["name"]}', author="JAFORD")
    story = [paragraph("JAFORD · Technical profile", "Heading2"), paragraph(spec["family"], "Heading1"),
             paragraph(spec["name"], "Heading2"), paragraph(spec["use"]), Spacer(1, 16),
             paragraph("Catalog information", "Heading2"), table(spec["fields"])]
    if spec.get("reference"):
        ref = spec["reference"]
        story += [Spacer(1, 16), paragraph("Reference specification", "Heading2"),
                  paragraph("Published reference information, not JAFORD batch measurements or guaranteed acceptance limits. Analog specifications do not establish the formulation or performance of a different model."),
                  Spacer(1, 8), table(ref["fields"]), Spacer(1, 12),
                  paragraph("Source: " + ref["source"]["title"]), paragraph(ref["source"]["url"]),
                  paragraph("Reviewed: " + ref["source"]["reviewed"])]
    if spec.get("scope"):
        story += [Spacer(1, 12), paragraph("Development / testing scope", "Heading2")]
        story += [paragraph(point) for point in spec["scope"]]
    if spec.get("note"):
        story += [Spacer(1, 12), paragraph(spec["note"])]
    story += [Spacer(1, 16), paragraph("Catalog facts: owner-supplied JAFORD product and capability brief. A technical profile is not a batch certificate, safety data sheet or measured performance report."),
              paragraph("Reference revision: 2026-10-10 · " + spec["id"])]
    document.build(story)
print(f"Generated {len(registry)} local specification PDFs.")
