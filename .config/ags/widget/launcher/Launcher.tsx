import Apps from "gi://AstalApps";
import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { Variable } from "astal";
import Pango from "gi://Pango?version=1.0";
import { hideAllWindows } from "../../utils/windows";

export const LauncherWindowName = "Launcher";

function launchApp(app: Apps.Application) {
  app.launch();
}

interface AppButtonProps {
  app: Apps.Application;
  isSelected: boolean;
}

function ensureChildVisible(
  scrolledWindow: Gtk.ScrolledWindow,
  index: number
): void {
  const vAdj = scrolledWindow.get_vadjustment();
  const container = scrolledWindow.get_child();
  if (!container || !vAdj) return;

  const height = 48;
  const viewStart = vAdj.get_value();
  const viewEnd = viewStart + vAdj.get_page_size();

  const childTop = height * index;
  const childBottom = height * index + height;

  if (childTop < viewStart) {
    vAdj.set_value(childTop);
  } else if (childBottom > viewEnd) {
    const newValue = childBottom - vAdj.get_page_size();
    vAdj.set_value(Math.min(newValue, vAdj.get_upper() - vAdj.get_page_size()));
  }
}

function AppButton({ app, isSelected }: AppButtonProps) {
  return (
    <button
      canFocus={false}
      className={isSelected ? "selectedAppButton" : "appButton"}
      onClicked={() => {
        hideAllWindows();
        launchApp(app);
      }}
      child={
        <box child={
          <box valign={Gtk.Align.CENTER} vertical={true} child={
            <label
              className="name"
              xalign={0}
              label={app.name}
              ellipsize={Pango.EllipsizeMode.END}
            />
          }/>
        }/>
      }
    />
  );
}

export default function () {
  const { CENTER } = Gtk.Align;
  let apps = new Apps.Apps();

  const selectedIndex = Variable(0);
  const text = Variable("");
  const list = text((text) => {
    let listApps = apps
      .exact_query(text)
      .filter((app) => app.name.toLowerCase().includes(text.toLowerCase()))
      .sort((a, b) => {
        if (a.name === b.name) {
          return 0;
        }
        let aMatch = a.name.toLowerCase().startsWith(text.toLowerCase());
        let bMatch = b.name.toLowerCase().startsWith(text.toLowerCase());
        if (aMatch && bMatch) {
          if (a.name > b.name) {
            return 1;
          } else {
            return -1;
          }
        } else if (aMatch) {
          return -1;
        } else {
          return 1;
        }
      });
    if (listApps.length - 1 < selectedIndex.get()) {
      if (listApps.length === 0) {
        selectedIndex.set(0);
      } else {
        selectedIndex.set(listApps.length - 1);
      }
    }
    return listApps;
  });
  const onEnter = () => {
    if (list.get().length > 0) {
      const app = list.get()?.[selectedIndex.get()];
      if (app !== null) {
        launchApp(app);
      }
    }
    hideAllWindows();
  };
  const listBinding = Variable.derive([list, selectedIndex]);
  let textEntryBox: Gtk.Entry | null = null;

  const scrolledWindow = new Gtk.ScrolledWindow({
    vscrollbar_policy: Gtk.PolicyType.AUTOMATIC,
    propagate_natural_height: true,
    can_focus: false,
    child: (
      <box spacing={6} vertical={true}>
        <box vertical>
          {listBinding((value) =>
            value[0].map((app, index) => (
              <AppButton app={app} isSelected={index === value[1]} />
            ))
          )}
        </box>
        <box
          halign={CENTER}
          vertical={true}
          marginBottom={8}
          visible={list.as((l) => l.length === 0)}
          child={<label className="labelSmall" label="No match found" />}
        />
        <box />
      </box>
    ),
  });

  scrolledWindow.get_style_context().add_class("scrollWindow");

  return (
    <window
      namespace={"okpanel-app-launcher"}
      name={LauncherWindowName}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM}
      exclusivity={Astal.Exclusivity.IGNORE}
      keymode={Astal.Keymode.EXCLUSIVE}
      layer={Astal.Layer.OVERLAY}
      application={App}
      onShow={() => {
        apps = new Apps.Apps();
        text.set("");
        selectedIndex.set(0);
        if (textEntryBox != null) {
          textEntryBox.text = "";
        }
      }}
      onKeyPressed={function (_, key) {
        if (key === Gdk.KEY_Escape) {
          hideAllWindows();
        } else if (
          key === Gdk.KEY_Down &&
          list.get().length >= selectedIndex.get()
        ) {
          selectedIndex.set(selectedIndex.get() + 1);
          ensureChildVisible(scrolledWindow, selectedIndex.get());
        } else if (key === Gdk.KEY_Up && selectedIndex.get() != 0) {
          selectedIndex.set(selectedIndex.get() - 1);
          ensureChildVisible(scrolledWindow, selectedIndex.get());
        }
      }}
      className="transparentBackground"
      marginTop={200}
      marginBottom={200}
      visible={false}
      child={
        <box vertical={true} child={
          <box className="window" child={
            <box widthRequest={500} className="Launcher" vertical={true} children={[
              <box vertical={false} children={[
                <label className="searchIcon" label="" />,
                <entry
                  className="searchField"
                  placeholderText="Search"
                  onChanged={(self) => text.set(self.text)}
                  onActivate={onEnter}
                  hexpand={true}
                  setup={(self) => {
                    textEntryBox = self;
                  }}
                />
              ]} />,
              scrolledWindow
            ]} />
          }/>
        } />
      }
    />
  );
}
