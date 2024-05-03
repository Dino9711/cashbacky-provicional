export const getBy = (text = '', data) => {
  if (text === '') {
    return data;
  }

  const textForSearch = text.toLowerCase();

  return data.filter((entity) => {
    return Object.values(entity).some((value) => {
      if (typeof value === 'object' && value != null && value.name != null) {
        return value.name.toString().toLowerCase().includes(textForSearch);
      }
      return (
        value != null && value.toString().toLowerCase().includes(textForSearch)
      );
    });
  });
};
