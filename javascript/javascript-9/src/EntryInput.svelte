<script>
    import Button, { Label, Icon } from '@smui/button';
    import Select, { Option } from '@smui/select';
    import Textfield, { Input, Textarea } from '@smui/textfield';
    import Dialog, {Title, Content, Actions, InitialFocus} from '@smui/dialog';
    import { formatDate, parseDate, } from './dateUtils.js';

    export let defaultValues;
    export let entryTypes;
    export let onEnter;

    let wrongInputDialog;

    let dateStr = formatDate(defaultValues.date || new Date());
    let typeId = defaultValues.type.id;
    let amount = defaultValues.amount;
    
    const handleSubmit = () => {
        if (amount < 1)
            wrongInputDialog.open();
        const date = parseDate(dateStr);
        const type = entryTypes.filter(e => e.id.toString() === typeId)[0];
        onEnter({
            date, type, amount,
        });
    };
</script>

<form on:submit|preventDefault={handleSubmit}>
    <Textfield 
        type="date" 
        updateInvalid 
        bind:value={dateStr} 
        label="Date" 
        style="min-width: 100px;" 
    >
    </Textfield>

    <Select 
        enhanced 
        bind:value={typeId} 
        label="Expense type" 
        class="demo-select-width" 
        menu$class="demo-select-width"
        style="max-width: 150px;"
    >
        {#each entryTypes as entryType}
          <Option value={entryType.id} selected={typeId === entryType.id}>{entryType.text}</Option>
        {/each}
      </Select>

    <Textfield 
        type="number" 
        updateInvalid 
        bind:value={amount} 
        label="Amount" 
        style="max-width: 100px;" 
        min='1'
    >
    </Textfield>

    <Button on:click={handleSubmit} type='button'>
        <Icon class="material-icons">add</Icon>
        <Label>Add</Label>
    </Button>
</form>

<Dialog bind:this={wrongInputDialog} aria-labelledby="simple-title" aria-describedby="simple-content">
    <Title id="simple-title">Wrong input data</Title>
    <Content id="simple-content">
        Please enter a positive amount
    </Content>
    <Actions>
    <Button>
        <Label>OK</Label>
    </Button>
    </Actions>
</Dialog>
