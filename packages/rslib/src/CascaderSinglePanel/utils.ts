interface CascaderOption {
  value: string;
  label: string;
  pid?: string;
  children?: CascaderOption[];
}

export function flattenTreeWithPid(
  tree: CascaderOption[],
  pid = null,
  parent: CascaderOption[] = [],
): CascaderOption[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return tree.reduce((acc: any, node: any) => {
    // const { children, ...rest } = node;
    const parents = pid ? [...parent] : [];

    const newNode = {
      ...node, // don't need children use rest
      pid: pid,
      parents: parents,
      isLeaf: !node.children,
    };

    // 递归处理子节点
    return [
      ...acc,
      newNode,
      ...(node.children
        ? flattenTreeWithPid(node.children, node.value, [...parents, node])
        : []),
    ];
  }, []);
}
