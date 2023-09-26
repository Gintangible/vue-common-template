const GENDER_MAP = {
  MALE: {
    name: '男',
    value: 'MALE',
  },
  FEMALE: {
    name: '女',
    value: 'FEMALE',
  },
};

const GENDERS = Object.values(GENDER_MAP);

export function genderFilter(gender) {
  return GENDER_MAP[gender]?.name;
}

export {
  GENDER_MAP,
  GENDERS,
  GENDERS as default,
};
