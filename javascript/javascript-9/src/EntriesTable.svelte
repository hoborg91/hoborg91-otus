<script>
    import DataTable, {Head, Body, Row, Cell} from '@smui/data-table';
    import Button, { Label, Icon } from '@smui/button';
    import Textfield, { Input, Textarea } from '@smui/textfield';
    import EntryInput from './EntryInput.svelte';
    
    export let entries;
    export let remove;

    const filter = (entry) => {
        console.log(entry);
    };

    let min = 1;
    let allEntries = [];
    $: filteredEntries = allEntries.filter(entry => entry.amount >= min);
    
    entries.subscribe(es => {
        allEntries = es;
    });
</script>

<div class='js-9-entries-table'>
    <span class="mdc-typography--overline">
        Filter displayed entries by minimal amount: 
    </span>

    <Textfield 
        type="number" 
        updateInvalid 
        bind:value={min} 
        label="" 
        style="max-width: 100px;" 
    >
    </Textfield>

    <div class="mdc-typography--overline">Table</div>
    
    <DataTable table$aria-label="Expenses list">
        <Head>
            <Row>
                <Cell>Date</Cell>
                <Cell>Expense type</Cell>
                <Cell>Amount</Cell>
                <Cell></Cell>
            </Row>
        </Head>
        <Body>
            {#each filteredEntries as entry}
            <Row>
                <Cell>{entry.date.toLocaleDateString()}</Cell>
                <Cell>{entry.type.text}</Cell>
                <Cell numeric>{entry.amount}</Cell>
                <Cell>
                    <Button on:click={() => remove(entry)} type='button'>
                        <Icon class="material-icons">remove</Icon>
                        <Label>Remove</Label>
                    </Button>
                </Cell>
            </Row>
          {/each}
        </Body>
    </DataTable>
</div>
