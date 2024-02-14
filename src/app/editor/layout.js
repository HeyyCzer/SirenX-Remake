import StoreProvider from "../StoreProvider";

export default function Layout({ children }) {
	return (
		<StoreProvider>
			{ children }
		</StoreProvider>
	)
}