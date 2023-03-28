const ADDMENUE = {
  ADDBIPUM: '비품 등록',
  ADDMULTIPLE: '단품 등록',
};

const SIDEBAR = {
  DASHBOARD: '대시보드',
  REQUEST_STATUS: '요청 현황',
  MANAGEMENT: '비품 관리',
  EQUIPMENT_ADD: '비품 등록',
};

const REQUEST_TYPES = {
  ALL: 'ALL',
  SUPPLY: 'SUPPLY',
  REPAIR: 'REPAIR',
  RETURN: 'RETURN',
  REPORT: 'REPORT',
};

const REQUEST_STATUSES = {
  ALL: 'ALL',
  UNPROCESSED: 'UNPROCESSED',
  PROCESSING: 'PROCESSING',
  PROCESSED: 'PROCESSED',
};

const REQUEST_NAME = {
  ALL: '전체',
  SUPPLY: '비품 요청',
  REPAIR: '수리 요청',
  RETURN: '반납 요청',
  REPORT: '보고서 결재',
};

const CATEGORY = {
  전체: '',
  컴퓨터: 'COMPUTER',
  디지털: 'DIGITAL',
  가전제품: 'ELECTRONICS',
  가구: 'FURNITURE',
  기타: 'ETC',
};

const EQUIPMENT_STATUS = {
  ALL: '전체',
  STOCK: '재고',
  USING: '사용중',
  REPAIRING: '수리중',
};

export const REQUEST_PAGES = {
  UNPROCESSED: {
    name: REQUEST_NAME.ALL,
    type: '',
    status: REQUEST_STATUSES.UNPROCESSED,
  },
  SUPPLY: {
    name: REQUEST_NAME.SUPPLY,
    type: REQUEST_TYPES.SUPPLY,
    status: '',
  },
  REPAIR: {
    name: REQUEST_NAME.REPAIR,
    type: REQUEST_TYPES.REPAIR,
    status: '',
  },
  REPORT: {
    name: REQUEST_NAME.REPORT,
    type: REQUEST_TYPES.REPORT,
    status: '',
  },
  RETURN: {
    name: REQUEST_NAME.RETURN,
    type: REQUEST_TYPES.RETURN,
    status: '',
  },
};

const STRING = {
  ADDMENUE,
  SIDEBAR,
  LARGECATEGORY,
  REQUEST_TYPES,
  REQUEST_STATUSES,
  REQUEST_NAME,
  CATEGORY,
  EQUIPMENT_STATUS,
};

export default STRING;
