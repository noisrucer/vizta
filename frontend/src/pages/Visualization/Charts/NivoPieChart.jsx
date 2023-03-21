import React from 'react';
import { useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../../theme";

const NivoPieChart = ({ data /* see data tab */ }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (

        <ResponsivePie
            data={data}
            margin={{ top: 20, right: 30, bottom: 60, left: 70 }}
            valueFormat=" >-~%"
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            theme={{
                textColor: colors.primary[100],
                tooltip: {
                    container: {
                        background: colors.grey[900], // set the background color of the tooltip to black
                    },
                    basic: {
                        whiteSpace: 'pre',
                        display: 'flex',
                        alignItems: 'center',
                        color: colors.textColor, // set the text color of the tooltip to white
                    },
                },
            }}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={0}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLinkLabelsTextColor={colors.textColor}
            arcLabel={function (e) { return e.value + "%" }}
            arcLabelsTextColor={"black"}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'ruby'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'c'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'go'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'python'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'scala'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'lisp'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'elixir'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'javascript'
                    },
                    id: 'lines'
                }
            ]}
        />
    )
}

export default NivoPieChart;