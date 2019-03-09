export function formatDate(date: Date): string {
  return [
      '' + date.getFullYear(),
      ('0' + (date.getMonth() + 1)).slice(-2),
      ('0' + date.getDate()).slice(-2),
    ]
    .join('-');
}

export function enumToArray(enumObject: object): string[] | number[] {
  return Object.keys(enumObject).map(key => enumObject[key]);
}
