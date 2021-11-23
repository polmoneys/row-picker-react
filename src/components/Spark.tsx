// @ts-nocheck
import { line, area } from 'd3-shape';
import { extent, bisector, max } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';
import { timeParse } from 'd3-time-format';

const Area = ({ data, areaGenerator }: any) => <path d={areaGenerator(data)} stroke="black" strokeWidth="2" opacity={0.2} />;

const Circles = ({ data, xScale, yScale, selectedYear }: any) =>
    data.map((d) => (
        <circle key={d.year} r={selectedYear === d.year ? 4 : 2} fill="black" stroke="#fff" strokeWidth={1.5} cx={xScale(d.year)} cy={yScale(d.value)} />
    ));

const Line = ({ data, lineGenerator }: any) => <path d={lineGenerator(data)} stroke="black" strokeWidth="2" fill="none" />;
interface Props {
    datum: Array<{ [key: string]: number }>;
}
export default function Ok(props: Props) {
    const parseTime = timeParse('%Y-%m-%d');
    const getScaleX = (data: any, width: any) =>
        scaleTime()
            .domain(extent(data, (d) => d[Object.keys(d)[0]]))
            .range([0, width]);

    const getScaleY = (data: any, height: any) =>
        scaleLinear()
            .domain([0, max(data, (d) => d[Object.keys(d)[1]])])
            .range([height, 0]);

    const margins = {
        top: 2,
        right: 2,
        bottom: 2,
        left: 2,
    };

    const parentWidth = 120;
    const width = parentWidth - margins.left - margins.right;
    const height = 52 - margins.top - margins.bottom;
    const xScale = getScaleX(props.datum, width);
    const yScale = getScaleY(props.datum, height);

    const lineGenerator = line()
        .x((d) => xScale(d.year))
        .y((d) => yScale(d.value));

    const areaGenerator = area()
        .x((d) => xScale(d.year))
        .y0(height)
        .y1((d) => yScale(d.value));

    return (
        <svg width={120} height={52} viewBox={`0 0 120 52`}>
            <g transform={`translate(${margins.left}, ${margins.top})`}>
                <Line data={props.datum} lineGenerator={lineGenerator} />
                <Area data={props.datum} areaGenerator={areaGenerator} />
                <Circles data={props.datum} xScale={xScale} yScale={yScale} />
            </g>
        </svg>
    );
}
