import sys
try:
    from pypdf import PdfReader
    reader = PdfReader('dist/assets/Musa Qureshi _ Data Scientist.pdf')
    for page in reader.pages:
        print(page.extract_text())
except Exception as e:
    print(e)
