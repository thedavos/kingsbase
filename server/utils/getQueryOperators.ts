type GetQueryOperatorsParams = {
  query: Record<string, any>;
  table: any;
};

const getQueryOperators = ({ query, table }: GetQueryOperatorsParams) => Object.keys(query).map((key) => {
  const filter = query[key];
  return eq(table[key], filter);
});

export default getQueryOperators;
