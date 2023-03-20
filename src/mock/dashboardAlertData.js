export const dashboardAlertData = {
  statusCode: 200,
  data: {
    supplyCountDtos: [
      {
        categoryId: 5,
        categoryName: '스피커',
        categoryImage: '',
        totalCount: 0,
        useCount: 0,
        repairCount: 0,
        stockCount: 0,
      },
    ],
    alertDtos: [
      {
        alertImg: 'https://i.imgur.com/5YGQ2qR.png',
        alertTitle: '김은지 님이 카메라 수시를 요청하였습니다.',
        alertModifiedAt: '2023-03-14T17:34:39',
      },
      {
        alertImg: 'https://i.imgur.com/rFCuUYt.png',
        alertTitle: '장석준 님이 비디오 레코더 반납을 요청하였습니다.',
        alertModifiedAt: '2023-03-14T15:34:39',
      },
      {
        alertImg: 'https://i.imgur.com/5YGQ2qR.png',
        alertTitle: '김형석 님이 노트북 비품을 요청하였습니다.',
        alertModifiedAt: '2023-03-13T12:34:39',
      },
      {
        alertImg: 'https://i.imgur.com/A0IsKAE.png',
        alertTitle: '정소정 님이 프린터 수리를 요청하였습니다.',
        alertModifiedAt: '2023-03-12T11:34:39',
      },
    ],
    requestsCountDto: {
      countMap: {
        repairRequests: 21,
        supplyRequests: 21,
        returnRequests: 21,
        inRepairRequests: 0,
      },
      modifiedAtMap: {
        supplyModifiedAt: '2023-03-15T15:24:44',
        inRepairModifiedAt: null,
        repairModifiedAt: '2023-03-15T16:24:47',
        returnModifiedAt: '2023-03-15T17:34:39',
      },
    },
  },
};
