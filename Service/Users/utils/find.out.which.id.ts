
const LOGIN_TYPE = {
  EMAIL: 'email',
  PHONE_NUMBER: 'phoneNumber'
} as const;

type ValuesOf<T extends Record<string, unknown>> = T[keyof T];

type LoginType = ValuesOf<typeof LOGIN_TYPE>;

export default function loginType(phoneEmail: string): LoginType {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return (re.test((phoneEmail)) ?  LOGIN_TYPE.EMAIL : LOGIN_TYPE.PHONE_NUMBER);
}
