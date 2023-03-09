import React from 'react';
import { useTheme } from "@mui/material";
import { ResponsiveRadar } from "@nivo/radar";
import { tokens } from "../../../theme";

const NivoRadarChart = ({ data /* see data tab */ }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (

        <ResponsiveRadar
            data={data}
            keys={['chardonay', 'carmenere', 'syrah']}
            indexBy="taste"
            valueFormat=">-.2f"
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            borderColor={{ from: 'color' }}
            gridLabelOffset={36}
            dotSize={10}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={2}
            colors={{ scheme: 'nivo' }}
            theme={{
                textColor: colors.primary[100],
                tooltip: {
                    container: {
                        background: "black", // set the background color of the tooltip to black
                    },
                    basic: {
                        whiteSpace: 'pre',
                        display: 'flex',
                        alignItems: 'center',
                        color: "white", // set the text color of the tooltip to white
                    },
                },
            }}
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