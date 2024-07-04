const limitByCategory = [
  {
    id: 6,
    limit: 5,
  },
  {
    id: 2,
    limit: 10,
  },
  {
    id: 5,
    limit: 5,
  },
  {
    id: 1,
    limit: 10,
  },
  {
    id: 3,
    limit: 5,
  },
  {
    id: 4,
    limit: 5,
  },
  {
    id: 7,
    limit: 5,
  },
];

export const limitProductByCategory = (id: number) => {
  const index = limitByCategory.findIndex((item) => id === item.id);
  if (index !== -1) return limitByCategory[index].limit;
  return 10;
};
