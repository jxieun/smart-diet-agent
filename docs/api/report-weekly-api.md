# 🎫 [API] 식단 리포트 및 통계 관리 (F-05)

## 1. 주간 리포트 조회 API
**Endpoint**: `GET /reports/weekly`
**Description**: 최근 7일간의 식단 데이터를 분석하여 영양 섭취 통계 및 일일 목표 달성 여부를 반환합니다.

### Request
| key | 설명 | value 타입 | 옵션 | Nullable | 예시 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Authorization | Bearer {token} (Header) | String | 필수 | No | Bearer eyJhbGci... |

### Response
| key | 설명 | value 타입 | 옵션 | Nullable | 예시 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| startDate | 리포트 분석 시작 날짜 | String | - | No | 2026-02-26 |
| endDate | 리포트 분석 종료 날짜 | String | - | No | 2026-03-05 |
| weeklyTotals | 주간 영양 성분 합계 객체 | Object | - | No | - |
| dailyAverages | 주간 일평균 영양 성분 객체 | Object | - | No | - |
| dailyDetails | 7일간의 일자별 상세 내역 배열 | Array | - | No | - |
| dailyDetails.date | 해당 기록 날짜 | String | - | No | 2026-03-04 |
| dailyDetails.totalCalories | 해당 일자 총 섭취 칼로리 | Number | - | No | 500 |
| dailyDetails.targetCalories | 해당 일자 설정 목표 칼로리 | Number | - | No | 2000 |
| dailyDetails.achievementRate | 목표 대비 달성률 (%) | Number | - | No | 25 |
| dailyDetails.isGoalAchieved | 목표 달성 여부 (90~110% 충족 시) | Boolean | - | No | false |
| dailyDetails.totalCarbs | 해당 일자 총 섭취 탄수화물 | Number | - | No | 35 |
| dailyDetails.totalProtein | 해당 일자 총 섭취 단백질 | Number | - | No | 30 |
| dailyDetails.totalFat | 해당 일자 총 섭취 지방 | Number | - | No | 8 |

### Example
```json
{
    "startDate": "2026-02-26",
    "endDate": "2026-03-05",
    "weeklyTotals": {
        "calories": 500,
        "carbs": 35,
        "protein": 30,
        "fat": 8
    },
    "dailyAverages": {
        "calories": 71,
        "carbs": 5,
        "protein": 4,
        "fat": 1
    },
    "dailyDetails": [
        {
            "date": "2026-03-04",
            "totalCalories": 500,
            "targetCalories": 2000,
            "achievementRate": 25,
            "isGoalAchieved": false,
            "totalCarbs": 35,
            "totalProtein": 30,
            "totalFat": 8
        }
    ]
}
```

### Status
| status | response content |
| :--- | :--- |
| 200 | 리포트 조회 성공 |
| 401 | 유효하지 않은 토큰 또는 인증 실패 (Unauthorized) |