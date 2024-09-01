import React from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface ChartComponentProps {
  options: Options; // Accept chart options as props
}

const ChartComponent: React.FC<ChartComponentProps> = ({ options }) => {
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};

export default ChartComponent;
