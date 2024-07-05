<script lang="ts">
	import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
	import Fa from "svelte-fa"
	import { onMount } from 'svelte';
	let allPoint = '0';
	let checkedAll = false;
	function checkAll() {
		const checks = document.querySelectorAll('.check') as NodeListOf<HTMLInputElement>;
		checks.forEach((check) => {
			if((check.parentNode?.parentNode as HTMLElement)?.style.display != 'none'){
				check.checked = checkedAll;
			}
		});
		checkChange();
	}
	let checked = {};
	const gemUp = [ 75 , 91 , 111, 139, 175, 219, 271, 331, 399, 475, 559, 651, 751, 859, 975, 1099 ]
	function checkChange() {
		const checks = document.querySelectorAll('.check') as NodeListOf<HTMLInputElement>;
		let result = 0;
		checks.forEach((check) => {
			if(check.checked) {
				result += parseInt(check.getAttribute('data-point') || '0');
			}
		});
		for(let i=1; i<=16; i++) {
			const gem = document.querySelector(`.gem${i}`) as HTMLInputElement;
			const gemResult = parseInt(gem.value) || 0;
			result += gemUp[i-1] * gemResult;
		}
		console.log(result);
		allPoint = result.toLocaleString("ko-KR");
	}
	async function getItems(group: string = "All") {
		let results;
		if(group!="All") {
			const res = await fetch(`/api/getAllItems?group=${group}`);
			results = await res.json();
		} else {
			const res = await fetch(`/api/getAllItems`);
			results = await res.json();
		}
		return results;
	}
	let queriedItems = {
		"스킨": true,
		"명패": true,
		"테두리": true,
		"지갑": true,
		"이모티콘": true
	};
	async function itemQuery(group: string) {
		const allItems = document.querySelectorAll(`.${group}`);
		allItems.forEach((item) => {
			const row = item as HTMLTableRowElement;
			if (queriedItems[group as keyof typeof queriedItems]) {
				row.style.display = 'none';
			} else {
				row.style.display = 'table-row';
			}
		});
		const queryBtn = document.querySelector<HTMLButtonElement>(`#${group}`) || document.createElement('button');
		queriedItems[group as keyof typeof queriedItems] = !queriedItems[group as keyof typeof queriedItems];
		queryBtn.style.backgroundColor = queriedItems[group as keyof typeof queriedItems] ? '#a6e2b0' : '#ffffff';
	}
	let promiseCharts = [];
	onMount(() => {
		promiseCharts = getItems();
	});
</script>

<div class="box">
	<div class="gemList">
		<div class="gemListI">
			<span style="opacity:0;">0</span><span>1단계</span>
			<input type="number" class="gem1" placeholder="개수" min=0 on:change={checkChange}>
		</div>
		<div class="gemListI">
			<span style="opacity:0;">0</span><span>2단계</span>
			<input type="number" class="gem2" placeholder="개수" min=0 on:change={checkChange}>
		</div>
		<div class="gemListI">
			<span style="opacity:0;">0</span><span>3단계</span>
			<input type="number" class="gem3" placeholder="개수" min=0 on:change={checkChange}>
		</div>
		<div class="gemListI">
			<span style="opacity:0;">0</span><span>4단계</span>
			<input type="number" class="gem4" placeholder="개수" min=0 on:change={checkChange}>
		</div>
		<div class="gemListI">
			<span style="opacity:0;">0</span><span>5단계</span>
			<input type="number" class="gem5" placeholder="개수" min=0 on:change={checkChange}>
		</div>
		<div class="gemListI">
			<span style="opacity:0;">0</span><span>6단계</span>
			<input type="number" class="gem6" placeholder="개수" min=0 on:change={checkChange}>
		</div>
		<div class="gemListI">
			<span style="opacity:0;">0</span><span>7단계</span>
			<input type="number" class="gem7" placeholder="개수" min=0 on:change={checkChange}>
		</div>
		<div class="gemListI">
			<span style="opacity:0;">0</span><span>8단계</span>
			<input type="number" class="gem8" placeholder="개수" min=0 on:change={checkChange}>
		</div>
		<div class="gemListI">
			<span style="opacity:0;">0</span><span>9단계</span>
			<input type="number" class="gem9" placeholder="개수" min=0 on:change={checkChange}>
		</div>
		<div class="gemListI">
			<span>10단계</span>
			<input type="number" class="gem10" placeholder="개수" min=0 on:change={checkChange}>
		</div>
		<div class="gemListI">
			<span>11단계</span>
			<input type="number" class="gem11" placeholder="개수" min=0 on:change={checkChange}>
		</div>
		<div class="gemListI">
			<span>12단계</span>
			<input type="number" class="gem12" placeholder="개수" min=0 on:change={checkChange}>
		</div>
		<div class="gemListI">
			<span>13단계</span>
			<input type="number" class="gem13" placeholder="개수" min=0 on:change={checkChange}>
		</div>
		<div class="gemListI">
			<span>14단계</span>
			<input type="number" class="gem14" placeholder="개수" min=0 on:change={checkChange}>
		</div>
		<div class="gemListI">
			<span>15단계</span>
			<input type="number" class="gem15" placeholder="개수" min=0 on:change={checkChange}>
		</div>
		<div class="gemListI">
			<span>16단계</span>
			<input type="number" class="gem16" placeholder="개수" min=0 on:change={checkChange}>
		</div>
	</div>
	<input type="text" class="search" placeholder="아이템 검색...">
	<div class="groupList">
		<button id="스킨" on:click={() => {itemQuery("스킨");}}>스킨</button>
		<button id="명패" on:click={() => {itemQuery("명패");}}>명패</button>
		<button id="테두리" on:click={() => {itemQuery("테두리");}}>테두리</button>
		<button id="지갑" on:click={() => {itemQuery("지갑");}}>지갑</button>
		<button id="이모티콘" on:click={() => {itemQuery("이모티콘");}}>이모티콘</button>
	</div>
	<table>
		<thead>
			<tr>
				<th style="width:10%;"><input type="checkbox" class="allcheck" bind:checked={checkedAll} on:change={checkAll}></th>
				<th style="width:60%;">아이템 이름</th>
				<th style="width:20%;">획득 포인트</th>
			</tr>
		</thead>
		<tbody>
			{#await promiseCharts}
				<p>loading...</p>
			{:then items}
				{#each items as item}
				<tr class="{item.group} {item.name.replaceAll(" ", "")}">
					<td><input type="checkbox" class="check" data-point={item.point} on:change={checkChange}></td>
					<td>{item.name}</td>
					<td>{item.point.toLocaleString("ko-KR")}</td>
				</tr>
				{/each}
			{/await}
		</tbody>
	</table>
</div>
<footer>
	<div class="announcement">
		<Fa icon={faCircleInfo} /> 일부 지갑 아이템이 명패 항목으로 들어간 부분이 있을 수 있습니다. 이 경우 제보 부탁드립니다. <a href="/report">［제보하기］</a>
	</div>
	<div class="footer">
		계산 결과: <span class="result">{allPoint}</span> CP
	</div>
</footer>

<style>
	.announcement {
		font-size: 17px;
		padding: 5px;
		position: fixed;
		top: 0;
		z-index: 1;
		text-align: center;
		background-color: yellow;
		width: 100%;
	}
	.footer {
		margin-top: 20px;
		position: fixed;
		top: 0;
		width: 100%;
		padding: 30px 0;
		background-color: #f0f0f0;
		text-align: center;
		font-size: 1.5rem;
		font-weight: bold;
	}
	.box {
		width: 100%;
		height: 100%;
		background-color: #f0f0f0;
		display: flex;
		flex-direction: column;
		border-radius: 30px;
		margin: 0 auto;
		max-width: 64em;
		margin-top: 130px;
		margin-bottom: 50px;
	}
	.search {
		width: 70%;
		height: 40px;
		padding: 10px 50px;
		border-radius: 50px;
		border: 1px solid #000000;
		margin: 0 auto;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	input[type="checkbox"] {
		width: 15px;
		height: 15px;
	}
	table {
		text-align: center;
		margin-bottom: 30px;
	}
	.result {
		color: #ff0000;
	}
	.gemList {
		display: flex;
		flex-wrap: wrap;
		width: 70%;
		margin: 0 auto;
		margin-top: 30px;
		align-items: center;
		justify-content: space-evenly;
	}
	.gemList span {
		text-align: center;
		font-size: 20px;
		font-weight: bold;
	}
	.gemList input {
		width: 40px;
		margin: 1px;
		border-radius: 30px;
		border: 1px solid #000000;
		height: 30px;
		padding: 0 20px;
		text-align: center;
	}
	.groupList {
		display: flex;
		width: 90%;
		margin: 0 auto;
		margin-bottom: 20px;
		justify-content: space-around;
	}
	.groupList button {
		border-radius: 30px;
		border: 1px solid #000000;
		background-color: #a6e2b0;
		padding: 10px 15px;
	}
</style>