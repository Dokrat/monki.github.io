// RSI Scatter Chart - Chart.js wrapper for Blazor
window.MarketWavesChart = {
    chart: null,

    init: function (canvasId, intervalLabel) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return false;

        const ctx = canvas.getContext('2d');
        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                backgroundColor: '#1a1a1a',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(30,30,30,0.95)',
                        titleColor: '#e0e0e0',
                        bodyColor: '#b0b0b0',
                        borderColor: '#404040',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: function (ctx) {
                                const d = ctx?.raw ?? ctx?.dataset?.data?.[ctx?.dataIndex];
                                return (d && d.tooltipLines) || [];
                            }
                        }
                    },
                    datalabels: {
                        display: true,
                        anchor: 'end',
                        align: 'top',
                        offset: 2,
                        color: '#c0c0c0',
                        font: { size: 10 },
                        formatter: function (value, ctx) {
                            const raw = ctx?.raw ?? ctx?.dataset?.data?.[ctx?.dataIndex] ?? value;
                            if (!raw) return '';
                            return raw.symbol ?? raw.Symbol ?? '';
                        }
                    }
                },
                scales: {
                    x: {
                        title: { display: true, text: 'Rank', color: '#909090', font: { size: 12 } },
                        min: 0,
                        max: 30,
                        grid: { color: 'rgba(80,80,80,0.3)' },
                        ticks: { color: '#909090', maxTicksLimit: 10 }
                    },
                    y: {
                        title: { display: true, text: 'RSI (' + (intervalLabel || '4h') + ')', color: '#909090', font: { size: 12 } },
                        min: 0,
                        max: 100,
                        grid: { color: 'rgba(80,80,80,0.3)' },
                        ticks: { color: '#909090', stepSize: 10 }
                    }
                }
            },
            plugins: (typeof ChartDataLabels !== 'undefined' ? [ChartDataLabels] : []).concat([{
                id: 'zoneBackground',
                beforeDraw: function (chart) {
                    const ctx = chart.ctx;
                    const yScale = chart.scales.y;
                    const top = yScale.top;
                    const bottom = yScale.bottom;
                    const height = bottom - top;
                    const yMax = 100;
                    const yMin = 0;

                    const toY = (val) => top + (1 - (val - yMin) / (yMax - yMin)) * height;

                    // OVERSOLD zone (green) - 0-30
                    ctx.fillStyle = 'rgba(34, 85, 51, 0.35)';
                    ctx.fillRect(0, toY(30), chart.width, toY(0) - toY(30));

                    // WEAK zone (lighter green) - 30-40
                    ctx.fillStyle = 'rgba(50, 100, 70, 0.25)';
                    ctx.fillRect(0, toY(40), chart.width, toY(30) - toY(40));

                    // NEUTRAL zone (brown/grey) - 40-60
                    ctx.fillStyle = 'rgba(90, 75, 55, 0.2)';
                    ctx.fillRect(0, toY(60), chart.width, toY(40) - toY(60));

                    // STRONG zone - 60-70
                    ctx.fillStyle = 'rgba(100, 80, 60, 0.2)';
                    ctx.fillRect(0, toY(70), chart.width, toY(60) - toY(70));

                    // OVERBOUGHT zone (red) - 70-100
                    ctx.fillStyle = 'rgba(120, 40, 40, 0.4)';
                    ctx.fillRect(0, toY(100), chart.width, toY(70) - toY(100));
                }
            }])
        });
        return true;
    },

    update: function (data, maxRank, generatedAt) {
        if (!this.chart) return;

        const overbought = [];
        const neutral = [];
        const oversold = [];

        const rankMax = (typeof maxRank === 'number' && maxRank > 0) ? maxRank : 30;
        const dateStr = generatedAt || '';

        data.forEach(function (item) {
            if (!item) return;
            const rsi = item.rsi ?? item.Rsi ?? 50;
            const rank = item.rank ?? item.Rank ?? 0;
            const zone = item.zone ?? item.Zone ?? 'neutral';
            const symbol = item.symbol ?? item.Symbol ?? '';
            const name = item.name ?? item.Name ?? '';
            const price = item.price ?? item.Price;
            const priceChangePct = item.priceChangePct ?? item.PriceChangePct;

            const tooltipLines = [
                'Symbol: ' + symbol,
                name ? 'Nazwa: ' + name : null,
                'RSI: ' + (rsi != null ? Number(rsi).toFixed(2) : '-'),
                'Zmiana RSI: -',
                'Zmiana ceny: ' + (priceChangePct != null ? (Number(priceChangePct) >= 0 ? '+' : '') + Number(priceChangePct).toFixed(2) + '%' : '-'),
                'Cena: ' + (price != null ? Number(price).toFixed(4) : '-'),
                dateStr ? 'Data pobrania: ' + dateStr : null
            ].filter(Boolean);

            const pt = {
                x: rank,
                y: Math.max(0, Math.min(100, rsi)),
                symbol: symbol,
                rsi: rsi,
                price: price,
                priceChangePct: priceChangePct,
                tooltipLines: tooltipLines
            };

            const target = zone === 'overbought' ? overbought : zone === 'oversold' ? oversold : neutral;
            target.push(pt);
        });

        this.chart.options.scales.x.max = rankMax;

        const datasets = [];
        if (overbought.length) datasets.push({ data: overbought, pointBackgroundColor: 'rgba(220, 80, 80, 0.9)', pointRadius: 5, pointHoverRadius: 7 });
        if (oversold.length) datasets.push({ data: oversold, pointBackgroundColor: 'rgba(80, 180, 100, 0.9)', pointRadius: 5, pointHoverRadius: 7 });
        if (neutral.length) datasets.push({ data: neutral, pointBackgroundColor: 'rgba(140, 130, 120, 0.85)', pointRadius: 5, pointHoverRadius: 7 });

        this.chart.data.datasets = datasets;
        this.chart.update('none');
    },

    destroy: function () {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    }
};
