export const env = process.env.NODE_ENV;
export const port = process.env.PORT;

export const nodeEnv = process.env.NODE_ENV || 'production';
export const salt = 'E1F53135E559C253';
export const jwtSecret =
  process.env.JWT_SECRET ||
  'bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4';

export const jwtExpiration = +(process.env.JWT_EXPIRATION || 90000000);

export const dbSettings = {
  host: process.env.DATABASE_HOST || 'remotemysql.com',
  user: process.env.DATABASE_USER_NAME || 'SGqxrjHw7B',
  password: process.env.DATABASE_PASSWORD || '3aEO0nmyyo',
  database: process.env.DATABASE_NAME || 'SGqxrjHw7B',
  connectionLimit: 10,
  multipleStatements: true,
  timezone: 'utc',
  typeCast: function castField(field, useDefaultTypeCasting) {

    // We only want to cast bit fields that have a single-bit in them. If the field
    // has more than one bit, then we cannot assume it is supposed to be a Boolean.
    if ((field.type === 'BIT') && (field.length === 1)) {

      const bytes = field.buffer();
      if (bytes === null || bytes === undefined) {
        return null;
      }
      // A Buffer in Node represents a collection of 8-bit unsigned integers.
      // Therefore, our single "bit field" comes back as the bits '0000 0001',
      // which is equivalent to the number 1.
      return (bytes[0] === 1);

    }
    return (useDefaultTypeCasting());
  }
};