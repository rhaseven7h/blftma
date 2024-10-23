import { ApiError } from '@/types/application';
import { Projects } from '@/types/projects';
import { getApiErrorEntityPassthrough } from '@/util/testing/get-api-error-or-entity';

const data: Projects = [
  {
    id: 1,
    account: { id: 1, name: 'Account 1' },
    account_id: 1,
    name: 'Project Alpha',
    owner_name: 'Alice Johnson',
    owner_email: 'alice.johnson@example.com'
  },
  {
    id: 2,
    account: { id: 2, name: 'Account 2' },
    account_id: 2,
    name: 'Project Beta',
    owner_name: 'Bob Brown',
    owner_email: 'bob.brown@example.com'
  },
  {
    id: 3,
    account: { id: 3, name: 'Account 3' },
    account_id: 3,
    name: 'Project Gamma',
    owner_name: 'Charlie Davis',
    owner_email: 'charlie.davis@example.com'
  }
];

const error: ApiError = {
  code: 'b8cbd74a-e85e-4595-8fdd-f2af32d663e4',
  name: 'sandbox-error',
  message: 'some sandbox error.'
};

const otherObject = { foo: 'bar' };

const otherArray = [1, 2, 3, 4, 5];

const otherString = 'zas';

const otherNumber = 42;

const otherBoolean = true;

const otherUndefined = undefined;

const otherNull = null;

describe('getApiErrorEntityPassthrough', () => {
  it('if ApiError', () => {
    const result = getApiErrorEntityPassthrough<Projects>({ error });
    expect(result.error).toEqual(error);
    expect(result.entity).toBeUndefined();
    expect(result.passthrough).toBeUndefined();
  });

  it('if Entity', () => {
    const result = getApiErrorEntityPassthrough<Projects>({ data });
    expect(result.entity).toEqual(data);
    expect(result.error).toBeUndefined();
    expect(result.passthrough).toBeUndefined();
  });
  [
    { name: 'Object', other: otherObject },
    { name: 'Array', other: otherArray },
    { name: 'String', other: otherString },
    { name: 'Number', other: otherNumber },
    { name: 'Boolean', other: otherBoolean },
    { name: 'Undefined', other: otherUndefined },
    { name: 'Null', other: otherNull }
  ].forEach((other) => {
    it(`if Other ${other.name}`, () => {
      const result = getApiErrorEntityPassthrough<Projects>(other.other);
      expect(result.passthrough).toEqual(other.other);
      expect(result.error).toBeUndefined();
      expect(result.entity).toBeUndefined();
    });
  });
});
