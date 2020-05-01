<script>
    import FusionCharts from 'fusioncharts';
    import Charts from 'fusioncharts/fusioncharts.charts';
    import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
    import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

    export let entryTypes;
    export let entries;

    const dataSource = {
        "chart": {
            "caption": "Expense structure",
            "subCaption" : "",
            "showValues":"1",
            "showPercentInTooltip" : "1",
            "numberPrefix" : "$",
            "enableMultiSlicing":"1",
            "theme": "fusion"
        },
        "data": entryTypes.map(t => ({
            'label': t.text,
            'value': 0,
        }))
    };

    fcRoot(FusionCharts, Charts, FusionTheme);

    let chartConfig = {
        type: 'pie3d',
        width: '600',
        height: '400',
        renderAt: 'chart-container',
        dataSource
    };

    entries.subscribe(es => {
        let dataSource = chartConfig.dataSource;

        for (let i = 0; i < dataSource.data.length; i++) {
            const label = dataSource.data[i].label;
            const value = es
                .filter(entry => entry.type.text === label)
                .map(entry => entry.amount)
                .reduce((sum, next) => sum + next, 0);
            dataSource.data[i].value = value;
        }

        chartConfig = {
            ...chartConfig,
            dataSource
        };
    });
</script>

<div id="chart-container" >
    <SvelteFC {...chartConfig} />
</div>