const KINSHIP_MAP = {
  SELF: {
    name: '本人',
    value: 'SELF',
  },
  PARENT: {
    name: '父母',
    value: 'PARENT',
  },
  CHILD: {
    name: '子女',
    value: 'CHILD',
  },
  SPOUSE: {
    name: '配偶',
    value: 'SPOUSE',
  },
  OTHER: {
    name: '其他',
    value: 'OTHER',
  }
};

const KINSHIPS = Object.values(KINSHIP_MAP);

const KINSHIP_DIRECTS = [KINSHIP_MAP.SELF, KINSHIP_MAP.PARENT, KINSHIP_MAP.CHILD, KINSHIP_MAP.SPOUSE];

export function kinshipFilter(kinship) {
  return KINSHIP_MAP[kinship]?.name;
}

export {
  KINSHIP_MAP,
  KINSHIPS,
  KINSHIP_DIRECTS,
};
