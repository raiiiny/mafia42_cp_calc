import { json } from '@sveltejs/kit';
import Database from "better-sqlite3";

function allItems(params: URLSearchParams) {
	const db = new Database("./db/items.db", { verbose: console.log });
	db.pragma("journal_mode = WAL");
	console.log(params.get("group")?.toString());
	let allItemList;
	if(params.get("group")?.toString()) {
		const allItemsQuery = db.prepare("SELECT * FROM items WHERE group = ? ORDER BY name ASC")
		allItemList = allItemsQuery.all(params.get("group")?.toString());
	} else {
		const allItemsQuery = db.prepare("SELECT * FROM items ORDER BY name ASC");
		allItemList = allItemsQuery.all();
	}
	console.log(allItemList);
	db.close();
	return allItemList;
}

export function GET(RequestEvent) {
	const items = allItems(RequestEvent.url.searchParams);
	return json(items);
}