import ROUTER from './routerConst';

const SIDEBAR = {
  SIDEBAR_STYLE(pathname, isAdmin) {
    return isAdmin
      ? [
          pathname === ROUTER.PATH.ADMIN.DASHBOARD && true,
          pathname === ROUTER.PATH.ADMIN.REQUEST_STATUS && true,
          pathname === ROUTER.PATH.ADMIN.EQUIPMENT_MANAGEMENT && true,
          pathname === ROUTER.PATH.ADMIN.EQUIPMENT_ADD && true,
          pathname === ROUTER.PATH.ADMIN.MANAGEMENT && true,
        ]
      : [
          pathname === ROUTER.PATH.USER.DASHBOARD && true,
          pathname === ROUTER.PATH.USER.REQUEST && true,
          pathname === ROUTER.PATH.USER.REQUEST_LIST && true,
          pathname === ROUTER.PATH.USER.STOCK_VIEW && true,
        ];
  },
};

const MULTIPLE_HEADER = [
  '종류',
  '제품명',
  '시리얼넘버',
  '등록일자',
  '부서',
  '사용자',
  '협력업체',
];

const CSV_DATA = [
  {
    종류: '필수 입력',
    제품명: '필수 입력',
    시리얼넘버: '필수 입력',
    등록일자: '선택 입력',
    부서: '선택 입력',
    사용자: '선택 입력',
    협력업체: '선택 입력',
  },
];

const EXCEL_COLUMN = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

const ARRAY = {
  SIDEBAR,
  MULTIPLE_HEADER,
  CSV_DATA,
  EXCEL_COLUMN,
};

export default ARRAY;
