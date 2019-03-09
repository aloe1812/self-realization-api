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
