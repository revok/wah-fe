import { Container } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { useEffect } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Container as DiContainer } from 'typedi';
import { IGroupedEntry } from '../../../interfaces/groupedEntry.interface';
import ApiService from '../../../services/api.service';
import './Admin.scss';
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      className="tabpanel"
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box>
            {children}
          </Box>
        </Container>
      )}
    </div>
  );
}

const Admin: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const [data, setData] = React.useState([] as IGroupedEntry[]);

  // Load data when selected tab changes.
  useEffect(() => {
    let granularity;
    switch (selectedTab) {
      case 0:
        granularity = 'day';
        break;

      case 1:
        granularity = 'month';
        break;

      case 2:
      default:
        granularity = 'year';
        break;
    }

    loadData(granularity);
  }, [ selectedTab ]);

  const handleTabChange = (event: React.ChangeEvent<{}> | undefined, newValue: number) => {
    setSelectedTab(newValue);
  };


  const loadData = (granularity: string) => {
    const apiService = DiContainer.get(ApiService);

    if (apiService) {
      apiService
        .getGroupedData(granularity)
        .then((d) => setData(d));
    }
  }

  const renderTab = () => {

    if(!(Array.isArray(data) && data.length)) {
      return (
        <div className="chart-container">
          <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
            Sorry, no data yet!
          </Box>
        </div>
      )
    }

    return (
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400} key={selectedTab}>
            <Pie
              dataKey="value"
              data={data}
              label={(entry) => ` ${entry.name} `}
              cx="50%"
              cy="50%"
              fill="#8884d8"
            >
              {data.map((entry, index) => <Cell key={entry.name} fill={entry.color} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="form-container">
      <AppBar position="static">
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="statistics">
          <Tab label="Day" />
          <Tab label="Month" />
          <Tab label="Year" />
        </Tabs>
      </AppBar>

      <TabPanel value={selectedTab} index={0}>
        { renderTab() }
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        { renderTab() }
      </TabPanel>

      <TabPanel value={selectedTab} index={2}>
        { renderTab() }
      </TabPanel>
    </div>
  );
};

export default Admin;
