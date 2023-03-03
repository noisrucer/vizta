import React from 'react';
import { useTheme } from "@mui/material";
import { ResponsiveRadar } from "@nivo/radar";
import { tokens } from "./theme";

const NivoRadarChart = ({ data /* see data tab */ }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (

        <ResponsiveRadar
            data={data}
            keys={['chardonay', 'carmenere', 'syrah']}
            indexBy="taste"
            valueFormat=">-.2f"
            margin={{}}
            borderColor={{ from: 'color' }}
            gridLabelOffset={36}
            dotSize={10}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={2}
            colors={{ scheme: 'nivo' }}
            blendMode="multiply"
            motionConfig="wobbly"
            legends={[
                {
                    anchor: 'top-left',
                    direction: 'column',
                    translateX: -50,
                    translateY: -40,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: '#999',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    )
}

export default NivoRadarChart;