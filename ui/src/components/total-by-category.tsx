import {useAppSelector} from "../store/store";
import ReactApexChart from 'react-apexcharts';
import {useMemo} from "react";

export const TotalByCategory = () => {
    const {total} = useAppSelector(store => store.expensesStore);

    const series = useMemo(() => {
        if (!total?.totalByCategory) {
            return []
        }
        
        return [{
            name: 'Expense',
            data: Object.values(total?.totalByCategory)
        }];
    }, [total?.totalByCategory])
    
    const categories = useMemo(() => {
        if (!total?.totalByCategory) {
            return []
        }
        
        return Object.keys(total?.totalByCategory)
    }, [total?.totalByCategory])

    // Настройки диаграммы
    const options = useMemo(() => {
        return {
            chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    colors: {
                        ranges: [{
                            from: -1000000000,
                            to: 0,
                            color: '#FF4560' // Красный для отрицательных значений
                        }, {
                            from: 0,
                            to: 1000000000,
                            color: '#008FFB' // Синий для положительных значений
                        }]
                    },
                    borderRadius: 4,
                    columnWidth: '80%',
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: categories,
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Значения ($)'
                },
                labels: {
                    formatter: function (value: any) {
                        return value.toFixed(1);
                    }
                }
            },
            tooltip: {
                y: {
                    formatter: function (val: any) {
                        return val.toFixed(1) + ' $';
                    }
                }
            }
        };
    }, [categories])


    if (total) {
        return (
            <div className='h-100 '>
                <ReactApexChart
                    // @ts-ignore
                    options={options}
                    series={series}
                    type="bar"
                    height={350}
                />
            </div>
        );
    }

    return <></>
}