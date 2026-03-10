import easyocr
import os

class OCRService:
    def __init__(self):
        print("⏳ OCR 모델을 로드 중입니다... 잠시만 기다려 주세요.")
        self.reader = easyocr.Reader(['ko', 'en'])
        print("✅ OCR 모델 로드 완료!")

    def extract_text(self, image_path: str):
        try:
            # 1. 원본 결과 확인을 위해 로그 추가
            results = self.reader.readtext(image_path, detail=0)
            print(f"📦 OCR 원본 결과: {results}")
            return results
        except Exception as e:
            # 2. 에러가 발생한다면 어떤 에러인지 출력
            print(f"🚨 OCR 분석 중 진짜 에러 발생: {str(e)}")
            return None

# 싱글톤 패턴으로 하나만 생성해서 공유
ocr_service = OCRService()