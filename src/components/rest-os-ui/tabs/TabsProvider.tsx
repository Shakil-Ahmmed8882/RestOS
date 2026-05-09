"use client";

import { createContext, useContext, useState } from "react";
import { TabsItem } from "./TabItem";
import { TabsContextType, TabsProps, TabsProviderProps } from "./tabs.type";
import { TabsSkeleton } from "../placeholder/skeletons/TabsSkeleton";

export const Context = createContext<TabsContextType | undefined>(undefined);

function Provider({ value, children }: { value: TabsContextType; children: React.ReactNode }) {
	return <Context.Provider value={value}>{children}</Context.Provider>;
}

// -------------------------------
// TabsProvider with controlled/uncontrolled support
// -------------------------------
export function TabsProvider(props: TabsProviderProps) {
	const { activeTabs, defaultActive = [], multiple = false } = props;

	// if `activeTabs` is provided => controlled mode
	const [internalActiveTabs, setInternalActiveTabs] = useState<string[]>(
		Array.isArray(defaultActive) ? defaultActive : [defaultActive],
	);

	const isControlled = activeTabs !== undefined;
	const currentActiveTabs = isControlled ? activeTabs! : internalActiveTabs;
	const setActiveTabs = isControlled ? props.setActiveTabs! : setInternalActiveTabs;

	return (
		<Provider
			value={{
				activeTabs: currentActiveTabs,
				setActiveTabs,
				multiple,
				valueAs: props.valueAs,
			}}
		>
			{props.children}
		</Provider>
	);
}

// -------------------------------
// Tabs container
// -------------------------------
export const Tabs = ({ loading = false, children, ...rest }: TabsProps) => {
	if (loading) return <TabsSkeleton />;
	return (
		<div className="flex gap-x-3 md:gap-x-4 " {...rest}>
			{children}
		</div>
	);
};

// -------------------------------
// return UI & States
// -------------------------------
Tabs.Item = TabsItem;
export const useTabs = () => {
	const context = useContext(Context);
	if (!context) {
		throw new Error("useTabs must be used within TabsProvider");
	}
	return context;
};

/* ============================ HOW TO USE ============================





export const BusinessNavigationTabs = () => {
    const {setActiveTab, businessFilterTabs} = useBusinessFilterSelector(); 
  

  const handleTabClick = (tabId: string | string[]) => {
    
    const id = Array.isArray(tabId) ? tabId[0] : tabId;
    if (!id) return;
      setActiveTab(id as TBusinessFilterTab)
  };  


  return (
    <>
      <div>
        
          <TabsProvider valueAs="id" defaultActive={['all']}>
          <Tabs className='flex gap-3 flex-wrap'>
            {businessFilterTabs?.map((tab: Tab) => (
              <Tabs.Item   onClick={handleTabClick} key={tab.id} tab={tab} className="!rounded-full !text-[14px] !px-6 md:!px-7.5">
                {tab.value}
              </Tabs.Item>
            ))}
          </Tabs>
        </TabsProvider>
        
      </div>
        
      
    </>
  );
};

*/
