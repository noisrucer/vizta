import React from 'react';
import { useTheme } from "@mui/material";
import { ResponsiveRadar } from "@nivo/radar";
import { tokens } from "../../../theme";

const NivoRadarChart = ({ data, keys }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (

        <ResponsiveRadar
            data={data}
            keys={keys}
            indexBy="criteria"
            valueFormat=">-.2f"
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            borderColor={{ from: 'color' }}
            gridShape="linear"
            gridLabelOffset={36}
            dotSize={10}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={2}
            colors={{ scheme: 'nivo' }}
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
            blendMode="multiply"
            motionConfig="wobbly"
        />
    )
}

export default NivoRadarChart;