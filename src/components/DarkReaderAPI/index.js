"use client";

import { useEffect } from "react";

export default function DarkReaderAPI() {
	useEffect(() => {
		const head = document.querySelector('head');
		const handleMutation = () => {
			const darkreaderSelector = 'meta[name="darkreader"]'
			const darkreaderActive = head.querySelector(darkreaderSelector) != null;
			if (darkreaderActive) {
				document.querySelectorAll(".darkreader").forEach((el) => el.remove());
			}
		};
		handleMutation();
		new MutationObserver(handleMutation).observe(head, { childList: true })
	}, []);
	return null;
}