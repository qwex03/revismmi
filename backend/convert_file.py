import sys
import os
from docx2pdf import convert as convert_docx2pdf
from pptxtopdf import convert as convert_pptxtopdf
from odt_pdf.odt_to_pdf import convert_odt_to_pdf

def convert_docx(file_path):
    file_name = os.path.basename(file_path)
    output_path = "docs/" + os.path.splitext(file_name)[0] + ".pdf"
    convert_docx2pdf(file_path, output_path)
    pass

def convert_pptx(file_path):
    convert_pptxtopdf(file_path, "docs")
    pass

def convert_odt(file_path):
    convert_odt_to_pdf(file_path, "docs")

def convert_file(file_path, file_ext):
    converters = {
        ".docx": convert_docx,
        ".pptx": convert_pptx,
        ".odt": convert_odt,
    }

    if file_ext in converters:
        converters[file_ext](file_path)
    else:
        print(f"Extension de fichier non prise en charge: {file_ext}")

if __name__ == "__main__":
    file_path = sys.argv[1]
    file_ext = sys.argv[2]
    convert_file(file_path, file_ext)