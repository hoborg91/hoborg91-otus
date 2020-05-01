<script>
    import { entries, add, remove, } from './store.js';
    import EntriesTable from './EntriesTable.svelte';
    import EntryInput from './EntryInput.svelte';
    import Chart from './Chart.svelte';

    import Button, { Label, Icon } from '@smui/button';
    let clicked = 0;

    const entryTypes = [
        { id: 1, text: `Food` },
        { id: 2, text: `Transport` },
        { id: 3, text: `Entertainment` },
    ];

    [{
        date: new Date(), type: entryTypes[1], amount: 100,
    }, {
        date: new Date(), type: entryTypes[2], amount: 50,
    }].forEach(e => add(e));
</script>

<div class='block'>
    <div class="mdc-typography--overline">Add new entry</div>
    <EntryInput 
        defaultValues={{ date: new Date(), type: entryTypes[0], amount: 10, }}
        entryTypes={entryTypes}
        onEnter={add}
    ></EntryInput>
</div>

<div class='block'>
    <EntriesTable 
        entries={entries} 
        remove={remove}
    ></EntriesTable>
</div>

<div class='block'>
    <div class="mdc-typography--overline">Chart</div>
    <Chart entries={entries} entryTypes={entryTypes}></Chart>
</div>

<style>
    div.block {
        margin: 20px;
    }
</style>