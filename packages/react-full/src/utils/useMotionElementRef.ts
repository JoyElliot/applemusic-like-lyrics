import { type Ref, type RefCallback, useLayoutEffect, useState } from "react";

/** Motion 组件的 ref 回调始终不变，传入的 ref 变化时不会重新绑定，因此改在 layout effect 中转发 */
export function useMotionElementRef<T>(
	external: Ref<T> | undefined,
): RefCallback<T> {
	const [node, setNode] = useState<T | null>(null);
	useLayoutEffect(() => {
		if (!node || !external) return;
		const cleanup = typeof external === "function" ? external(node) : undefined;
		if (typeof external !== "function") external.current = node;
		return () => {
			if (cleanup) cleanup();
			else if (typeof external === "function") external(null);
			else external.current = null;
		};
	}, [node, external]);
	return setNode;
}
