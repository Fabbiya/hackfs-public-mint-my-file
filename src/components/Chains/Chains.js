import React from "react";
import { useEffect, useState } from "react";
//import { Menu, Dropdown, Button } from "antd";
//import { DownOutlined } from "@ant-design/icons";
import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "./Logos";
import { useChain, useMoralis } from "react-moralis";
import { Dropdown } from "react-bootstrap";
import "./Chains.css";

const menuItems = [
  {
    key: "0x89",
    value: "Polygon",
    icon: <PolygonLogo />,
    disabled: false,
    variant: "chains",
  },
  {
    key: "0x5",
    value: "Goerli",
    icon: <ETHLogo />,
    disabled: true,
    variant: "chains",
  },
  {
    key: "0x13881",
    value: "Mumbai",
    icon: <PolygonLogo />,
    disabled: true,
    variant: "chains",
  },
  {
    key: "0x61",
    value: "Smart Chain Testnet",
    icon: <BSCLogo />,
    disabled: true,
    variant: "chains",
  },
  {
    key: "0x38",
    value: "BNB Chain",
    icon: <BSCLogo />,
    disabled: true,
    variant: "chains",
  },

  {
    key: "0x1",
    value: "Ethereum",
    icon: <ETHLogo />,
    disabled: true,
    variant: "chains",
  },
  {
    key: "0xa86a",
    value: "Avalanche",
    icon: <AvaxLogo />,
    disabled: true,
    variant: "chains",
  },
];



export default function Chains() {
  const { isAuthenticated,chainId } = useMoralis();
  const [selected, setSelected] = useState({});

  useEffect(() => {
   setSelected({
    key: "0x89",
    value: "Polygon",
    icon: <PolygonLogo />,
    disabled: false,
    variant: "chains",
  })
  }, [])
  
  const handleMenuClick = (e) => {
    setSelected(e);
  };

  if (!chainId || !isAuthenticated) return null;
  
  return (
    <Dropdown className="mx-3">
      <Dropdown.Toggle
        variant="light"
        id="dropdown-basic"
        className="btn h-100 w-100 py-2 mt-2 mt-lg-0 mb-2 mb-lg-0"
      >
        {selected.icon} {selected.value}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* style={{ ...styles.button, ...styles.item }} */}
        {menuItems.map((item, idx) => (
          <Dropdown.Item
            key={idx}
            href="#"
            onClick={() => handleMenuClick(item)}
            disabled={item.disabled}
          >
            {item.icon}
            <span style={{ marginLeft: "5px" }}>{item.value}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

