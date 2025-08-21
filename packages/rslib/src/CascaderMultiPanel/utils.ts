export type ValueType = string | number;

export interface CascaderOption {
  value: ValueType;
  label: string;
  children?: CascaderOption[];
}

/** 扁平化生成 pathLabel（用于搜索） */
export const flattenOptions = (options: CascaderOption[]) => {
  const flat: Array<{
    value: ValueType;
    label: string;
    pathLabel: string;
    path: string[];
    node: CascaderOption;
    hasChildren: boolean;
  }> = [];

  const traverse = (nodes: CascaderOption[], parentPath: string[] = []) => {
    nodes.forEach((node) => {
      const currentPath = [...parentPath, node.label];
      flat.push({
        value: node.value,
        label: node.label,
        pathLabel: currentPath.join(' - '),
        path: currentPath,
        node,
        hasChildren: !!(node.children && node.children.length > 0),
      });
      if (node.children) traverse(node.children, currentPath);
    });
  };

  traverse(options);
  return flat;
};

export const findPathByValue = (
  targetValue: ValueType,
  nodes: CascaderOption[],
  currentPath: CascaderOption[] = [],
): CascaderOption[] | null => {
  for (const node of nodes) {
    const newPath = [...currentPath, node];
    if (node.value === targetValue) return newPath;
    if (node.children) {
      const found = findPathByValue(targetValue, node.children, newPath);
      if (found) return found;
    }
  }
  return null;
};

export const getLeafValues = (node: CascaderOption): ValueType[] => {
  if (!node.children || node.children.length === 0) return [node.value];
  return node.children.flatMap((c) => getLeafValues(c));
};

export const getAllChildrenValues = (node: CascaderOption): ValueType[] => {
  const values: ValueType[] = [];
  if (node.children) {
    node.children.forEach((child) => {
      values.push(child.value);
      values.push(...getAllChildrenValues(child));
    });
  }
  return values;
};

export const isNodeIndeterminate = (
  node: CascaderOption,
  selectedValues: Set<ValueType>,
): boolean => {
  if (!node.children) return false;
  const leafVals = getLeafValues(node);
  const selectedCount = leafVals.filter((v) => selectedValues.has(v)).length;
  return selectedCount > 0 && selectedCount < leafVals.length;
};

export const shouldNodeBeSelected = (
  node: CascaderOption,
  selectedValues: Set<ValueType>,
): boolean => {
  if (!node.children || node.children.length === 0) {
    return selectedValues.has(node.value);
  }
  const leafVals = getLeafValues(node);
  return leafVals.length > 0 && leafVals.every((v) => selectedValues.has(v));
};
