import easyocr
import os

class OCRService:
    def __init__(self):
        # 한글(ko)과 영어(en) 모델 로드
        self.reader = easyocr.Reader(['ko', 'en'])

    def extract_text(self, image_path: str):
        if not os.path.exists(image_path):
            return None
        
        # 텍스트만 리스트 형식으로 추출
        return self.reader.readtext(image_path, detail=0)

# 싱글톤 패턴으로 하나만 생성해서 공유
ocr_service = OCRService()