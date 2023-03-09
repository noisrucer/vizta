import React from 'react';
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../../theme";

const NivoBarChart = ({ data }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMap = {
        'hot dog': '#ff0000',
        'burger': '#00ff00',
        'sandwich': '#0000ff',
        'kebab': '#ff00ff',
        'fries': '#00ffff',
    };
    return (
        <ResponsiveBar
            layout="horizontal"
            data={data}
            keys={[
                'hot dog',
                'burger',
                'sandwich',
                'kebab',
                'fries'
            ]}
            indexBy="group"
            margin={{ top: 10, right: 20, bottom: 50, left: 70 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
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

            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'fries'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'sandwich'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}

            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in country: " + e.indexValue }}
        />
    )
}

export default NivoBarChart