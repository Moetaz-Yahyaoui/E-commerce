export const handleFieldsStructure = (arrayFields: any) =>
  arrayFields.reduce(
    (previousValue: any, currentValue: Record<string, string>) => ({
      ...previousValue,
      [currentValue.fieldname]: currentValue.fieldalias,
    }),
    {}
  );

export const tableDatastructure = (arrayFields: any, data: Array<any>) => {
  const fieldsStructure = handleFieldsStructure(arrayFields);
  return data.map((value: Record<string, string>) => {
    return Object.keys(value)
      .filter(
        k =>
          k === "id" ||
          k === "Id" ||
          k === "productid" ||
          k === "ordershippingid" ||
          k === "invoicefilename" ||
          fieldsStructure[k]
      )
      .reduce((previousValue, k) => {
        if (k === "id") return { ...previousValue, id: value[k] };
        if (k === "productid") return { ...previousValue, productid: value[k] };
        if (k === "ordershippingid")
          return { ...previousValue, ordershippingid: value[k] };
        if (k === "invoicefilename")
          return { ...previousValue, invoicefilename: value[k] };
        else
          return {
            ...previousValue,
            [fieldsStructure[k]]: value[k],
          };
      }, {});
  });
};
