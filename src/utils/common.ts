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

export function sortGroupsCompareFn(groupDto: any) {
  return (a: any, b: any) => {
    const indexA = groupDto.goals.indexOf(a.id);
    const indexB = groupDto.goals.indexOf(b.id);

    if (indexA === -1 && indexB === -1) { // both not found, we don't care which comes first
      return 0;
    }

    if (indexA === -1) { // a not found, then it should have greater index than b
      return 1;
    }

    if (indexB === -1) { // b not found, then it should have greater index than a
      return -1;
    }

    return indexA < indexB ? -1 : 1;
  };
}
