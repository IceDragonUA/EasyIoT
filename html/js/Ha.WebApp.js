var Ha = Ha || {};
Ha.Data = Ha.Data || {};
Ha.Data.Groups = [];
Ha.Data.Modules = [];
Ha.Data.AutomationGroups = [];
Ha.Data.AutomationProgram = null;
Ha.Data.ServiceCall = function (d, a, b, e, f) {
    var g = "/Api/EasyIoT/" + d + "/";
    $.ajax({
        url: g, type: b, data: a, dataType: "json", success: function (a) {
            var b = eval(a);
            if ("undefined" == typeof b) b = a; else if ("undefined" != typeof b[0] && "undefined" != typeof b[0].ResponseValue)try {
                b = b[0].ResponseValue
            } catch (d) {
                b = a
            }
            null != e && e(b)
        }, error: function (a, b, d) {
            (f || "undefined" == typeof f) && alert("Error " + g)
        }
    })
};
Ha.Data.Driver = Ha.Data.Driver || {};
Ha.Data.Group = Ha.Data.Group || {};
Ha.Data.Group.GetModuleGroup = function (d) {
    for (var a = null, b = 0; b < Ha.Data.Groups.length; b++) {
        for (var e = 0; e < Ha.Data.Groups[b].Modules.length; e++)if (d.Domain == Ha.Data.Groups[b].Modules[e].Domain && d.Address == Ha.Data.Groups[b].Modules[e].Address) {
            a = Ha.Data.Groups[b];
            break
        }
        if (null != a)break
    }
    return a
};
Ha.Data.Module = Ha.Data.Module || {};
Ha.Data.Module.RemoveFromGroup = function (d, a, b, e) {
    for (i = 0; i < Ha.Data.Groups.length; i++)if (Ha.Data.Groups[i].GroupName == d) {
        Ha.Data.Groups[i].Modules = $.grep(Ha.Data.Groups[i].Modules, function (d) {
            return d.Domain != a || d.Address != b
        });
        break
    }
    Ha.Data.ServiceCall("Config/Group/SaveAll/", JSON.stringify(Ha.Data.Groups), "POST", e)
};
Ha.Data.Module.ListGroupModules = function (d) {
    for (var a = {Modules: []}, b = 0; b < Ha.Data.Groups.length; b++)if (Ha.Data.Groups[b].GroupName == d)for (var e = 0; e < Ha.Data.Groups[b].Modules.length; e++)for (var f = 0; f < Ha.Data.Modules.length; f++)Ha.Data.Groups[b].Modules[e].Domain == Ha.Data.Modules[f].Domain && Ha.Data.Groups[b].Modules[e].Address == Ha.Data.Modules[f].Address && a.Modules.push(Ha.Data.Modules[f]);
    return a
};
Ha.Data.Module.GetModuleByDomainAddress = function (d, a) {
    for (var b = null, e = 0; e < Ha.Data.Modules.length; e++)if (Ha.Data.Modules[e].Domain == d && Ha.Data.Modules[e].Address == a) {
        b = Ha.Data.Modules[e];
        break
    }
    return b
};
Ha.WebApp = Ha.WebApp || {};
Ha.WebApp.Utility = Ha.WebApp.Utility || {};
Ha.WebApp.Utility.OpenSubPopUp = function (d, a) {
    var b = function (e, f) {
        setTimeout(function () {
            $(a).popup("open", {transition: "pop"})
        }, 100);
        $(d).off("popupafterclose", b)
    };
    $(d).on("popupafterclose", b);
    $(d).popup("close")
};
Ha.WebApp.Utility.GetModulePropertyByName = function (d, a) {
    var b = null;
    if (null != d.Properties)for (var e = 0; e < d.Properties.length; e++)if (d.Properties[e].Name == a) {
        b = d.Properties[e];
        break
    }
    return b
};
Ha.WebApp.Utility.SetModulePropertyByName = function (d, a, b, e) {
    var f = !1;
    if (null != d.Properties) {
        for (var g = 0; g < d.Properties.length; g++)if (d.Properties[g].Name == a) {
            d.Properties[g].Value = b;
            "undefined" != typeof e && (d.Properties[g].UpdateTime = e);
            f = !0;
            break
        }
        f || d.Properties.push({Name: a, Value: b})
    }
};
Ha.WebApp.Utility.FormatDate = function (d) {
    return $.datepicker.formatDate("D, dd/mm/yy", d)
};
Ha.WebApp.Utility.FormatDateTime = function (d, a) {
    var b = d.getHours().toString();
    1 == b.length && (b = "0" + b);
    var e = d.getMinutes().toString();
    1 == e.length && (e = "0" + e);
    var f = d.getSeconds().toString();
    1 == f.length && (f = "0" + f);
    b = b + ":" + e + ":" + f;
    a && (b += "." + d.getMilliseconds());
    return b
};
Ha.WebApp.Utility.GetBasicIconForModule = function (d) {
    return "S_GENERIC" == d.DeviceType ? "images/widgets/sensor.png" : "S_DIGITAL_INPUT" == d.DeviceType ? "images/widgets/digital_input.png" : "S_DIGITAL_OUTPUT" == d.DeviceType ? "images/widgets/socket_off.png" : "S_DOOR" == d.DeviceType ? "images/widgets/door_closed.png" : "S_ANALOG_INPUT" == d.DeviceType ? "images/widgets/ai.png" : "S_TEMP" == d.DeviceType ? "images/widgets/temperature.png" : "S_HUM" == d.DeviceType ? "images/widgets/humidity.png" : "S_BARO" == d.DeviceType ? "images/widgets/pressure.png" :
                                    "S_LIGHT_LEVEL" == d.DeviceType ? "images/widgets/radiation.png" : "S_ANALOG_OUTPUT" == d.DeviceType ? "images/widgets/ao.png" : "S_LEAK" == d.DeviceType ? "images/widgets/leak_ok.png" : "S_TEMP_AO" == d.DeviceType ? "images/widgets/temperature.png" : "S_HUM_AO" == d.DeviceType ? "images/widgets/humidity.png" : "S_DIMMER" == d.DeviceType ? "images/widgets/dimmer.png" : "S_COVER" == d.DeviceType ? "images/widgets/cover.png" : "S_DISTANCE" == d.DeviceType ? "images/widgets/distance.png" : "S_DUST" == d.DeviceType ? "images/widgets/dust.png" : "S_POWER" ==
                                                                        d.DeviceType ? "images/widgets/power.png" : "S_WATER" == d.DeviceType ? "images/widgets/water.png" : "S_UV" == d.DeviceType ? "images/widgets/uvindex.png" : "S_MOTION" == d.DeviceType ? "images/widgets/motion.png" : "images/widgets/sensor.png"
};
Ha.WebApp.Utility.GetBasicIcon1ForModule = function (d) {
    var a = "";
    "S_DIGITAL_OUTPUT" == d.DeviceType ? a = "images/widgets/socket_on.png" : "S_DOOR" == d.DeviceType ? a = "images/widgets/door_open.png" : "S_LEAK" == d.DeviceType ? a = "images/widgets/leak_alarm.png" : "S_MOTION" == d.DeviceType && (a = "images/widgets/motion_alarm.png");
    "" == a && (a = Ha.WebApp.Utility.GetBasicIconForModule(d));
    return a
};
Ha.WebApp.Utility.GetIconForModule = function (d) {
    var a = "", b = Ha.WebApp.Utility.GetModulePropertyByName(d, "Settings.Icon");
    null != b && "" != b && "undefined" != b && (a = "/images/custom/" + b.Value);
    "" == a && (a = Ha.WebApp.Utility.GetBasicIconForModule(d));
    return a
};
Ha.WebApp.Utility.GetIcon1ForModule = function (d) {
    var a = "", b = Ha.WebApp.Utility.GetModulePropertyByName(d, "Settings.Icon1");
    null != b && "" != b && "undefined" != b && (a = "/images/custom/" + b.Value);
    "" == a && (a = Ha.WebApp.Utility.GetBasicIcon1ForModule(d));
    return a
};
Ha.WebApp.Control = Ha.WebApp.Control || {};
Ha.WebApp.Control.Dataset = [];
Ha.WebApp.Control.GetWidgetBatteryData = function (d) {
    var a = "";
    d = Ha.WebApp.Utility.GetModulePropertyByName(d, "Status.Battery");
    null != d && (a = d.Value, 80 < a ? a = 100 : 60 < a ? a = 80 : 40 < a ? a = 60 : 20 < a ? a = 40 : 10 < a ? a = 20 : 0 < a && (a = 10), a = '<div style="margin:2px;height:28px;float:left"><div align="right" style="padding:4px;height:28px;text-align:bottom;width:100px;float:left"><img src="' + ("images/widgets/battery_level_" + a + ".png") + '" alt="' + d.UpdateTime + '" height="22" align="middle" style="vertical-align:bottom" /></div><div align="left" style="width:60px;padding:4px;float:left;"><font style="line-height:28px;text-align:bottom;color:gray">' + (d.Value +
        "%") + "</font></div></div>");
    return a
};
Ha.WebApp.Control.GetWidgetDateTime = function (d) {
    null != d ? (d = new Date(d), d = Ha.WebApp.Utility.FormatDate(d) + "<br>" + Ha.WebApp.Utility.FormatDateTime(d)) : d = "";
    return d
};
Ha.WebApp.Control.GetWidgetUIData = function (d) {
    var a = {icon: "", status: "", timestamp: null, rawvalue: "", unit: ""}, b;
    if ("S_GENERIC" == d.DeviceType) {
        if (a.icon = Ha.WebApp.Utility.GetIconForModule(d), null != d.Properties)for (b = 0; b < d.Properties.length; b++)a.status = a.status + ("" == d.Properties[b].Description ? d.Properties[b].Name : d.Properties[b].Description) + ": " + d.Properties[b].Value + ("" == d.Properties[b].Unit ? "" : "&nbsp;" + d.Properties[b].Unit) + "<br>"
    } else if ("S_DOOR" == d.DeviceType) a.icon = Ha.WebApp.Utility.GetIconForModule(d),
        b = Ha.WebApp.Utility.GetModulePropertyByName(d, "Sensor.DoorWindow"), null != b && (a.timestamp = b.UpdateTime, a.rawvalue = b.Value, "1" == b.Value ? (a.status = "OPEN", a.icon = Ha.WebApp.Utility.GetIcon1ForModule(d)) : a.status = "CLOSE"); else if ("S_LEAK" == d.DeviceType) a.icon = Ha.WebApp.Utility.GetIconForModule(d), b = Ha.WebApp.Utility.GetModulePropertyByName(d, "Sensor.Leak"), null != b && (a.timestamp = b.UpdateTime, a.rawvalue = b.Value, "1" == b.Value ? (a.status = "Leak", a.icon = Ha.WebApp.Utility.GetIcon1ForModule(d)) : a.status = "Ok"); else if ("S_MOTION" ==
        d.DeviceType) a.icon = Ha.WebApp.Utility.GetIconForModule(d), b = Ha.WebApp.Utility.GetModulePropertyByName(d, "Sensor.Motion"), null != b && (a.timestamp = b.UpdateTime, a.rawvalue = b.Value, "1" == b.Value ? (a.status = "Motion", a.icon = Ha.WebApp.Utility.GetIcon1ForModule(d)) : a.status = "Ok"); else if ("S_TEMP" == d.DeviceType || "S_TEMP_AO" == d.DeviceType) {
        a.icon = Ha.WebApp.Utility.GetIconForModule(d);
        var e = Ha.WebApp.Utility.GetModulePropertyByName(d, "Sensor.Temperature");
        null != e && (a.timestamp = e.UpdateTime, a.rawvalue = e.Value, b =
            Math.round(100 * e.Value.replace(",", ".")) / 100, isNaN(b) && (b = e.Value), a.status = b + ("" == e.Unit ? "" : "&nbsp;" + e.Unit), a.unit = e.Unit)
    } else if ("S_HUM" == d.DeviceType || "S_HUM_AO" == d.DeviceType) a.icon = Ha.WebApp.Utility.GetIconForModule(d), e = Ha.WebApp.Utility.GetModulePropertyByName(d, "Sensor.Humidity"), null != e && (a.timestamp = e.UpdateTime, a.rawvalue = e.Value, b = Math.round(100 * e.Value.replace(",", ".")) / 100, isNaN(b) && (b = e.Value), a.status = b + ("" == e.Unit ? "" : "&nbsp;" + e.Unit), a.unit = e.Unit); else if ("S_LIGHT_LEVEL" == d.DeviceType) a.icon =
        Ha.WebApp.Utility.GetIconForModule(d), e = Ha.WebApp.Utility.GetModulePropertyByName(d, "Sensor.LightLevel"), null != e && (a.timestamp = e.UpdateTime, a.rawvalue = e.Value, b = Math.round(100 * e.Value.replace(",", ".")) / 100, isNaN(b) && (b = e.Value), a.status = b + ("" == e.Unit ? "" : "&nbsp;" + e.Unit), a.unit = e.Unit); else if ("S_ANALOG_INPUT" == d.DeviceType) a.icon = Ha.WebApp.Utility.GetIconForModule(d), e = Ha.WebApp.Utility.GetModulePropertyByName(d, "Sensor.AnalogValue"), null != e && (a.timestamp = e.UpdateTime, a.rawvalue = e.Value, b = Math.round(100 *
            e.Value.replace(",", ".")) / 100, isNaN(b) && (b = e.Value), a.status = b + ("" == e.Unit ? "" : "&nbsp;" + e.Unit), a.unit = e.Unit); else if ("S_BARO" == d.DeviceType) a.icon = Ha.WebApp.Utility.GetIconForModule(d), e = Ha.WebApp.Utility.GetModulePropertyByName(d, "Sensor.Pressure"), null != e && (a.timestamp = e.UpdateTime, a.rawvalue = e.Value, b = Math.round(100 * e.Value.replace(",", ".")) / 100, isNaN(b) && (b = e.Value), a.status = b + ("" == e.Unit ? "" : "&nbsp;" + e.Unit), a.unit = e.Unit), e = Ha.WebApp.Utility.GetModulePropertyByName(d, "Sensor.Forecast"), null !=
    e && ("" != a.status && (a.status += "<br>"), a.status += e.Value); else if ("S_DISTANCE" == d.DeviceType) a.icon = Ha.WebApp.Utility.GetIconForModule(d), e = Ha.WebApp.Utility.GetModulePropertyByName(d, "Sensor.Distance"), null != e && (a.timestamp = e.UpdateTime, a.rawvalue = e.Value, b = Math.round(100 * e.Value.replace(",", ".")) / 100, isNaN(b) && (b = e.Value), a.status = b + ("" == e.Unit ? "" : "&nbsp;" + e.Unit), a.unit = e.Unit); else if ("S_DUST" == d.DeviceType) a.icon = Ha.WebApp.Utility.GetIconForModule(d), e = Ha.WebApp.Utility.GetModulePropertyByName(d,
        "Sensor.DustLevel"), null != e && (a.timestamp = e.UpdateTime, a.rawvalue = e.Value, b = Math.round(100 * e.Value.replace(",", ".")) / 100, isNaN(b) && (b = e.Value), a.status = b + ("" == e.Unit ? "" : "&nbsp;" + e.Unit), a.unit = e.Unit); else if ("S_POWER" == d.DeviceType) a.icon = Ha.WebApp.Utility.GetIconForModule(d), e = Ha.WebApp.Utility.GetModulePropertyByName(d, "Sensor.Power"), null != e && (a.timestamp = e.UpdateTime, a.rawvalue = e.Value, b = Math.round(100 * e.Value.replace(",", ".")) / 100, isNaN(b) && (b = e.Value), a.status = b + ("" == e.Unit ? "" : "&nbsp;" + e.Unit),
        a.unit = e.Unit), e = Ha.WebApp.Utility.GetModulePropertyByName(d, "Sensor.PowerPerTime"), null != e && (a.timestamp = e.UpdateTime, a.rawvalue = e.Value, b = Math.round(100 * e.Value.replace(",", ".")) / 100, isNaN(b) && (b = e.Value), "" != a.status && (a.status += "<br>"), a.status += b + ("" == e.Unit ? "" : "&nbsp;" + e.Unit), a.unit = e.Unit); else if ("S_WATER" == d.DeviceType) a.icon = Ha.WebApp.Utility.GetIconForModule(d), e = Ha.WebApp.Utility.GetModulePropertyByName(d, "Sensor.WaterFlow"), null != e && (a.timestamp = e.UpdateTime, a.rawvalue = e.Value, b = Math.round(100 *
            e.Value.replace(",", ".")) / 100, isNaN(b) && (b = e.Value), a.status = b + ("" == e.Unit ? "" : "&nbsp;" + e.Unit), a.unit = e.Unit), e = Ha.WebApp.Utility.GetModulePropertyByName(d, "Sensor.WaterVolume"), null != e && (a.timestamp = e.UpdateTime, a.rawvalue = e.Value, b = Math.round(100 * e.Value.replace(",", ".")) / 100, isNaN(b) && (b = e.Value), "" != a.status && (a.status += "<br>"), a.status += b + ("" == e.Unit ? "" : "&nbsp;" + e.Unit), a.unit = e.Unit); else if ("S_UV" == d.DeviceType) a.icon = Ha.WebApp.Utility.GetIconForModule(d), e = Ha.WebApp.Utility.GetModulePropertyByName(d,
        "Sensor.UVIndex"), null != e && (a.timestamp = e.UpdateTime, a.rawvalue = e.Value, b = Math.round(100 * e.Value.replace(",", ".")) / 100, isNaN(b) && (b = e.Value), a.status = b + ("" == e.Unit ? "" : "&nbsp;" + e.Unit), a.unit = e.Unit); else if ("S_DIGITAL_INPUT" == d.DeviceType) {
        if (a.icon = Ha.WebApp.Utility.GetIconForModule(d), b = Ha.WebApp.Utility.GetModulePropertyByName(d, "Sensor.DigitalValue"), null != b) {
            a.timestamp = b.UpdateTime;
            a.rawvalue = b.Value;
            var e = "ON", f = "OFF", g = Ha.WebApp.Utility.GetModulePropertyByName(d, "Settings.StateText1");
            null !=
            g && (e = g.Value);
            g = Ha.WebApp.Utility.GetModulePropertyByName(d, "Settings.StateText2");
            null != g && (f = g.Value);
            a.status = "1" == b.Value ? e : f
        }
    } else"S_DIGITAL_OUTPUT" == d.DeviceType ? (a.icon = Ha.WebApp.Utility.GetIconForModule(d), e = Ha.WebApp.Utility.GetModulePropertyByName(d, "Sensor.DigitalValue"), null != e && (a.timestamp = e.UpdateTime, a.rawvalue = e.Value, b = Math.round(100 * e.Value.replace(",", ".")) / 100, isNaN(b) && (b = e.Value), e = "ON", f = "OFF", g = Ha.WebApp.Utility.GetModulePropertyByName(d, "Settings.StateText1"), null != g && (e =
            g.Value), g = Ha.WebApp.Utility.GetModulePropertyByName(d, "Settings.StateText2"), null != g && (f = g.Value), a.status = 1 <= b ? e : f, 1 <= b && (a.icon = Ha.WebApp.Utility.GetIcon1ForModule(d)))) : "S_ANALOG_OUTPUT" == d.DeviceType ? (a.icon = Ha.WebApp.Utility.GetIconForModule(d), e = Ha.WebApp.Utility.GetModulePropertyByName(d, "Sensor.AnalogValue"), null != e && (a.timestamp = e.UpdateTime, a.rawvalue = e.Value, b = Math.round(100 * e.Value.replace(",", ".")) / 100, isNaN(b) && (b = e.Value), a.status = b + ("" == e.Unit ? "" : "&nbsp;" + e.Unit), a.unit = e.Unit)) :
            "S_DIMMER" == d.DeviceType ? (a.icon = Ha.WebApp.Utility.GetIconForModule(d), e = Ha.WebApp.Utility.GetModulePropertyByName(d, "Sensor.DimmerLevel"), null != e && (a.timestamp = e.UpdateTime, a.rawvalue = e.Value, b = Math.round(100 * e.Value.replace(",", ".")) / 100, isNaN(b) && (b = e.Value), a.status = b + ("" == e.Unit ? "" : "&nbsp;" + e.Unit), a.unit = e.Unit)) : "S_COVER" == d.DeviceType && (a.icon = Ha.WebApp.Utility.GetIconForModule(d), e = Ha.WebApp.Utility.GetModulePropertyByName(d, "Sensor.CoverLevel"), null != e && (a.timestamp = e.UpdateTime, a.rawvalue =
                    e.Value, b = Math.round(100 * e.Value.replace(",", ".")) / 100, isNaN(b) && (b = e.Value), a.status = b + ("" == e.Unit ? "" : "&nbsp;" + e.Unit), a.unit = e.Unit));
    return a
};
Ha.WebApp.Control.UpdateModuleWidgetKnobValue = function (d, a) {
    var b;
    "S_ANALOG_OUTPUT" == a.DeviceType && (b = Ha.WebApp.Utility.GetModulePropertyByName(a, "Sensor.AnalogValue"));
    "S_HUM_AO" == a.DeviceType && (b = Ha.WebApp.Utility.GetModulePropertyByName(a, "Sensor.Humidity"));
    "S_TEMP_AO" == a.DeviceType && (b = Ha.WebApp.Utility.GetModulePropertyByName(a, "Sensor.Temperature"));
    "S_DIMMER" == a.DeviceType && (b = Ha.WebApp.Utility.GetModulePropertyByName(a, "Sensor.DimmerLevel"));
    "S_COVER" == a.DeviceType && (b = Ha.WebApp.Utility.GetModulePropertyByName(a,
        "Sensor.CoverLevel"));
    null == b ? knobValue = 0 : (knobValue = Math.round(100 * b.Value.replace(",", ".")) / 100, isNaN(knobValue) && (knobValue = b.Value));
    d.find("[data-ui-field=level_knob]").val(knobValue)
};
Ha.WebApp.Control.UpdateModuleWidget = function (d, a) {
    for (var b, e, f, g, h = 0; h < Ha.Data.Groups.length; h++) {
        group = Ha.Data.Groups[h];
        for (var l = 0; l < group.Modules.length; l++)if (e = group.Modules[l], e.Domain == d && e.Address == a) {
            e = group.Modules[l];
            for (var p = 0; p < Ha.Data.Modules.length; p++)if (Ha.Data.Modules[p].Domain == d && Ha.Data.Modules[p].Address == a) {
                var k = Ha.Data.Modules[p];
                if ("S_GENERIC" == k.DeviceType || "S_DOOR" == k.DeviceType || "S_MOTION" == k.DeviceType || "S_LEAK" == k.DeviceType || "S_DIGITAL_INPUT" == k.DeviceType || "S_TEMP" ==
                    k.DeviceType || "S_BARO" == k.DeviceType || "S_ANALOG_INPUT" == k.DeviceType || "S_HUM" == k.DeviceType || "S_LIGHT_LEVEL" == k.DeviceType || "S_DISTANCE" == k.DeviceType || "S_DUST" == k.DeviceType || "S_POWER" == k.DeviceType || "S_WATER" == k.DeviceType || "S_UV" == k.DeviceType) b = $("#groupdiv_" + h + "_" + k.Domain + "_" + k.Address), g = b.find("[data-ui-field=widget]"), null != g && "undefined" != g && (g.find("[data-ui-field=name]").html(k.Description), g.find("[data-ui-field=description]").html(k.Domain + " " + k.Address), f = null, e = Ha.WebApp.Control.GetWidgetUIData(k),
                    f = e.timestamp, g.find("[data-ui-field=status]").html(e.status), g.find("[data-ui-field=icon]").attr("src", e.icon), g.find("[data-ui-field=sensorstatus]").html(Ha.WebApp.Control.GetWidgetBatteryData(k)), g.find("[data-ui-field=updatetime]").html(Ha.WebApp.Control.GetWidgetDateTime(f))); else if ("S_DIGITAL_OUTPUT" == k.DeviceType) {
                    if (b = $("#groupdiv_" + h + "_" + k.Domain + "_" + k.Address), g = b.find("[data-ui-field=widget]"), null != g && "undefined" != g) {
                        var n = g.data("ControlPopUp");
                        n || (b.find("[data-ui-field=controlpopup]").trigger("create"),
                            n = b.find("[data-ui-field=controlpopup]").popup(), g.data("ControlPopUp", n), n.find("[data-ui-field=command_on]").on("click", function () {
                            Ha.Data.ServiceCall("Control/Module/" + k.Domain + "/" + k.Address + "/ControlOn/", null, "POST", null)
                        }), n.find("[data-ui-field=command_off]").on("click", function () {
                            Ha.Data.ServiceCall("Control/Module/" + k.Domain + "/" + k.Address + "/ControlOff/", null, "POST", null)
                        }), g.on("click", function () {
                            $(b).find("[data-ui-field=widget]").data("ControlPopUp") && $(b).find("[data-ui-field=widget]").data("ControlPopUp").popup("open")
                        }));
                        n.find("[data-ui-field=group]").html(group.GroupName);
                        f = null;
                        e = Ha.WebApp.Control.GetWidgetUIData(k);
                        f = e.timestamp;
                        g.find("[data-ui-field=status]").html(e.status);
                        g.find("[data-ui-field=icon]").attr("src", e.icon);
                        g.find("[data-ui-field=name]").html(k.Description);
                        g.find("[data-ui-field=description]").html(k.Domain + " " + k.Address);
                        g.find("[data-ui-field=sensorstatus]").html(Ha.WebApp.Control.GetWidgetBatteryData(k));
                        g.find("[data-ui-field=updatetime]").html(Ha.WebApp.Control.GetWidgetDateTime(f));
                        n.find("[data-ui-field=icon]").attr("src",
                            e.icon);
                        n.find("[data-ui-field=group]").html(group.GroupName);
                        n.find("[data-ui-field=name]").html(k.Description);
                        n.find("[data-ui-field=status]").html(e.status)
                    }
                } else if ("S_ANALOG_OUTPUT" == k.DeviceType || "S_TEMP_AO" == k.DeviceType || "S_HUM_AO" == k.DeviceType || "S_DIMMER" == k.DeviceType || "S_COVER" == k.DeviceType) b = $("#groupdiv_" + h + "_" + k.Domain + "_" + k.Address), g = b.find("[data-ui-field=widget]"), null != g && "undefined" != g && (n = g.data("ControlPopUp"), n || (b.find("[data-ui-field=controlpopup]").trigger("create"), n =
                    b.find("[data-ui-field=controlpopup]").popup(), g.data("ControlPopUp", n), "S_DIMMER" == k.DeviceType && (n.find("[data-ui-field=command_on]").on("click", function () {
                    Ha.Data.ServiceCall("Control/Module/" + k.Domain + "/" + k.Address + "/ControlOn/", null, "POST", null)
                }), n.find("[data-ui-field=command_off]").on("click", function () {
                    Ha.Data.ServiceCall("Control/Module/" + k.Domain + "/" + k.Address + "/ControlOff/", null, "POST", null)
                })), "S_COVER" == k.DeviceType && (n.find("[data-ui-field=command_up]").on("click", function () {
                    Ha.Data.ServiceCall("Control/Module/" +
                        k.Domain + "/" + k.Address + "/ControlUp/", null, "POST", null)
                }), n.find("[data-ui-field=command_down]").on("click", function () {
                    Ha.Data.ServiceCall("Control/Module/" + k.Domain + "/" + k.Address + "/ControlDown/", null, "POST", null)
                }), n.find("[data-ui-field=command_stop]").on("click", function () {
                    Ha.Data.ServiceCall("Control/Module/" + k.Domain + "/" + k.Address + "/ControlStop/", null, "POST", null)
                })), g.on("click", function () {
                    if ($(b).find("[data-ui-field=widget]").data("ControlPopUp")) {
                        var a = Ha.WebApp.Utility.GetModulePropertyByName(k,
                            "Settings.MinValue");
                        null == a ? knobMinValue = 0 : (knobMinValue = Math.round(100 * a.Value.replace(",", ".")) / 100, isNaN(knobMinValue) && (knobMinValue = a.Value));
                        a = Ha.WebApp.Utility.GetModulePropertyByName(k, "Settings.MaxValue");
                        null == a ? knobMaxValue = 100 : (knobMaxValue = Math.round(100 * a.Value.replace(",", ".")) / 100, isNaN(knobMaxValue) && (knobMaxValue = a.Value));
                        a = Ha.WebApp.Utility.GetModulePropertyByName(k, "Settings.ValueStep");
                        null == a ? knobValueStep = 1 : (knobValueStep = Math.round(100 * a.Value.replace(",", ".")) / 100, isNaN(knobValueStep) &&
                            (knobValueStep = a.Value));
                        n.find("[data-ui-field=level_knob]").knob({
                            release: function (a) {
                                Math.round(100 * a)
                            }
                        });
                        n.find("[data-ui-field=level_knob]").knob({
                            min: knobMinValue,
                            max: knobMaxValue,
                            step: knobValueStep
                        });
                        n.find("[data-ui-field=level_knob]").trigger("configure", {
                            min: knobMinValue,
                            max: knobMaxValue,
                            step: knobValueStep
                        });
                        Ha.WebApp.Control.UpdateModuleWidgetKnobValue(n, k);
                        $(b).find("[data-ui-field=widget]").data("ControlPopUp").popup("open")
                    }
                })), n.find("[data-ui-field=group]").html(group.GroupName), f =
                    null, g.find("[data-ui-field=knob_control]").css("display", "none"), g.find("[data-ui-field=knob_control]").hide(), e = Ha.WebApp.Control.GetWidgetUIData(k), f = e.timestamp, g.find("[data-ui-field=status]").html(e.status), g.find("[data-ui-field=icon]").attr("src", e.icon), g.find("[data-ui-field=name]").html(k.Description), g.find("[data-ui-field=description]").html(k.Domain + " " + k.Address), g.find("[data-ui-field=sensorstatus]").html(Ha.WebApp.Control.GetWidgetBatteryData(k)), g.find("[data-ui-field=updatetime]").html(Ha.WebApp.Control.GetWidgetDateTime(f)),
                    n.find("[data-ui-field=name]").html(k.Description), n.find("[data-ui-field=unit]").html(e.unit), f = Ha.WebApp.Utility.GetModulePropertyByName(k, "Settings.HideKnob"), null != f && (f.Value = 1, n.find("[data-ui-field=knob_control]").hide()), f = Math.round(100 * e.rawvalue.replace(",", ".")) / 100, isNaN(f) && (f = e.rawvalue), n.find("[data-ui-field=level_knob]").unbind("slidestop"), n.find("[data-ui-field=level_knob]").unbind("release"), n.find("[data-ui-field=level_knob]").val(f), n.find("[data-ui-field=level_knob]").knob({
                    release: function (a) {
                        a =
                            Math.round(100 * a) / 100;
                        Ha.Data.ServiceCall("Control/Module/" + k.Domain + "/" + k.Address + "/ControlLevel/" + a, null, "POST", null)
                    }
                }))
            }
        }
    }
};
Ha.WebApp.Control.SendEventToUi = function (d, a) {
    null != d && Ha.WebApp.Control.UpdateModuleWidget(a.Domain, a.Address)
};
Ha.WebApp.Control.RenderGroups = function () {
    var d = null;
    $("#control_groupslist").empty();
    for (var a = 0; a < Ha.Data.Groups.length; a++) {
        for (var d = Ha.Data.Groups[a], b = "<div id=groupdiv_" + a + ' class="ui-collapsible" data-role="collapsible"><h3>' + d.GroupName + '</h3><ul data-role="listview">', e = 0; e < d.Modules.length; e++)for (var f = d.Modules[e], g = 0; g < Ha.Data.Modules.length; g++)if (Ha.Data.Modules[g].Domain == f.Domain && Ha.Data.Modules[g].Address == f.Address) {
            var h = Ha.Data.Modules[g];
            if ("S_GENERIC" == h.DeviceType || "S_DIGITAL_INPUT" ==
                h.DeviceType || "S_BARO" == h.DeviceType || "S_ANALOG_INPUT" == h.DeviceType || "S_HUM" == h.DeviceType || "S_TEMP" == h.DeviceType || "S_LEAK" == h.DeviceType || "S_DOOR" == h.DeviceType || "S_MOTION" == h.DeviceType || "S_LIGHT_LEVEL" == h.DeviceType || "S_DISTANCE" == h.DeviceType || "S_DUST" == h.DeviceType || "S_POWER" == h.DeviceType || "S_WATER" == h.DeviceType || "S_UV" == h.DeviceType) b += '<li data-module-index="' + g + '" id=groupdiv_' + a + "_" + h.Domain + "_" + h.Address + '><a data-ui-field="widget">', b += '<img data-ui-field="icon" style="margin-left: 10px; margin-top: 10px" width="42"',
                b += 'src="images/widgets/sensor.png" />', b += '<span data-ui-field="name">loading...</span>', b += "<br />", b += '<p style="margin: 0">', b += '<span data-ui-field="description" style="color: gray">description loading...</span><br />', b += '<div data-ui-field="status" style="font-family: Monospace; font-size: 12pt; color: green">', b += "</div>", b += '<div data-ui-field="sensorstatus" style="font-family: Monospace; font-size: 10pt;', b += 'color: green; text-wrapping: wrap; margin-top: 5px; padding-bottom: 5px;">', b +=
                "</div>", b += '<div data-ui-field="updatetime" style="position: absolute; right: 50px; top: 32%;', b += 'bottom: 67%; color: gray; font-size: 8pt; font-weight: normal; text-align: right">', b += "</div>", b += "</p>", b += '</a><a href="#page_control_chart">Chart</a></li>'; else if ("S_DIGITAL_OUTPUT" == h.DeviceType) b += '<li data-module-index="' + g + '" id=groupdiv_' + a + "_" + h.Domain + "_" + h.Address + ' ><a data-ui-field="widget">', b += '<img data-ui-field="icon" style="margin-left: 10px; margin-top: 10px" width="42"', b += 'src="images/widgets/socket_off.png" />',
                b += '<span data-ui-field="name">loading...</span>', b += "<br />", b += '<p style="margin: 0">', b += '<span data-ui-field="description" style="color: gray">description loading...</span><br />', b += '<div data-ui-field="status" style="font-family: Monospace; font-size: 12pt; color: green">', b += "</div>", b += '<div data-ui-field="sensorstatus" style="font-family: Monospace; font-size: 10pt;', b += 'color: green; text-wrapping: wrap; margin-top: 5px; padding-bottom: 5px;">', b += "</div>", b += '<div data-ui-field="updatetime" style="position: absolute; right: 50px; top: 32%;',
                b += 'bottom: 67%; color: gray; font-size: 8pt; font-weight: normal; text-align: right">', b += "</div>", b += "</p>", b += '</a><a href="#page_control_chart">Chart</a>', b += "\x3c!-- Popup ---\x3e", b += '<div data-ui-field="controlpopup" data-position-to="window" style="width:260px" data-transition="pop" >', b += '<a href="#" data-rel="back" data-role="button" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>', b += '<div style="margin:10px">', b += '<table width="100%">', b += "<tr>", b += '<td width="64">',
                b += '<img data-ui-field="icon" height="64" src="images/widgets/socket_off.png" />', b += "</td>", b += "<td>", b += '<div data-ui-field="group" style="margin:0;font-family:Georgia;font-size:11pt;color:gray">Group Name</div>', b += '<h4 data-ui-field="name" style="margin:0;">Description</h4>', b += "</td>", b += "</tr>", b += "</table>", b += '<div data-ui-field="status" style="margin:0;font-size:18pt;" align="center"></div>', b += '<div align="center">', b += '<div data-role="controlgroup" data-type="horizontal">', b += '<a data-role="button" data-ui-field="command_off">OFF</a>',
                b += '<a data-role="button" data-ui-field="command_on">ON</a>', b += "</div>", b += "</div>", b += "<br />", b += "</div>", b += "</div>", b += "</li>"; else if ("S_ANALOG_OUTPUT" == h.DeviceType || "S_TEMP_AO" == h.DeviceType || "S_HUM_AO" == h.DeviceType || "S_DIMMER" == h.DeviceType || "S_COVER" == h.DeviceType) b += '<li data-module-index="' + g + '" id=groupdiv_' + a + "_" + h.Domain + "_" + h.Address + ' ><a data-ui-field="widget">', b += '<img data-ui-field="icon" style="margin-left: 10px; margin-top: 10px" width="42"', b += 'src="images/widgets/ao.png" />',
                b += '<span data-ui-field="name">loading...</span>', b += "<br />", b += '<p style="margin: 0">', b += '<span data-ui-field="description" style="color: gray">description loading...</span><br />', b += '<div data-ui-field="status" style="font-family: Monospace; font-size: 12pt; color: green">', b += "</div>", b += '<div data-ui-field="sensorstatus" style="font-family: Monospace; font-size: 10pt;', b += 'color: green; text-wrapping: wrap; margin-top: 5px; padding-bottom: 5px;">', b += "</div>", b += '<div data-ui-field="updatetime" style="position: absolute; right: 50px; top: 32%;',
                b += 'bottom: 67%; color: gray; font-size: 8pt; font-weight: normal; text-align: right">', b += "</div>", b += "</p>", b += '</a><a href="#page_control_chart">Chart</a>', b += "\x3c!-- Popup ---\x3e", b += '<div data-ui-field="controlpopup" data-position-to="window" style="width:260px" data-transition="pop" >', b += '<a href="#" data-rel="back" data-role="button" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>', b += '<div style="margin:10px">', b += '<table width="100%">', b += "<tr><td>", b += '<div data-ui-field="group" style="margin:0;font-family:Georgia;font-size:11pt;color:gray">Group Name</div>',
                b += '<h4 data-ui-field="name" style="margin:0;">Description</h4>', b += "</td>", b += "</tr>", b += "<tr><td>", b += '<div align="center">', b += '<h1 data-ui-field="unit" style="margin:0;"></h1>', b += "</div>", b += "</td></tr>", b += "</table>", b += '<div data-ui-field="status" style="margin:0;font-size:18pt;" align="center"></div>', b += '<div data-ui-field="knob_control" align="center">', b += '<input data-ui-field="level_knob" data-role="none" type="text" class="dial" ', b += 'data-angleOffset="-125" data-angleArc="250" data-displayprevious=true>',
                b += "</div>", "S_DIMMER" == h.DeviceType ? (b += '<div data-ui-field="status" style="margin:0;font-size:18pt;" align="center"></div>', b += '<div align="center">', b += '<div data-role="controlgroup" data-type="horizontal">', b += '<a data-role="button" data-ui-field="command_off">OFF</a>', b += '<a data-role="button" data-ui-field="command_on">ON</a>', b += "</div>", b += "</div>") : "S_COVER" == h.DeviceType && (b += '<div data-ui-field="status" style="margin:0;font-size:18pt;" align="center"></div>', b += '<div align="center">', b +=
                    '<div data-role="controlgroup" data-type="horizontal">', b += '<a data-role="button" data-ui-field="command_down">Down</a>', b += '<a data-role="button" data-ui-field="command_stop">Stop</a>', b += '<a data-role="button" data-ui-field="command_up">Up</a>', b += "</div>", b += "</div>"), b += "<br/>", b += "</div>", b += "</div>", b += "</li>"
        }
        b += "</ul></div>";
        $("#control_groupslist").append(b);
        $("#control_groupslist li").on("click", function () {
            var a = $(this).attr("data-module-index"), a = Ha.Data.Modules[a];
            null != a && ($("#control_groupslist").attr("selected-domain",
                a.Domain), $("#control_groupslist").attr("selected-address", a.Address))
        })
    }
    for (d = 0; d < Ha.Data.Modules.length; d++)h = Ha.Data.Modules[d], Ha.WebApp.Control.UpdateModuleWidget(h.Domain, h.Address);
    $("#control_groupslist").collapsibleset().trigger("create")
};
Ha.WebApp.Control.ReloadPage = function () {
    Ha.Data.ServiceCall("Config/Module/List/", null, "GET", function (d) {
        Ha.Data.Modules = d.Modules;
        Ha.Data.ServiceCall("Config/Group/List", null, "GET", function (a) {
            Ha.Data.Groups = a.Groups;
            Ha.WebApp.Control.RenderGroups();
            a = Cookies.get("sel_group");
            "undefined" === typeof a ? $("#groupdiv_0").collapsible("option", "collapsed", !1) : $("#".concat(a)).collapsible("option", "collapsed", !1)
        })
    });
    $("#change_password_button").unbind("click");
    $("#change_password_button").on("click", function (d) {
        Ha.Data.ServiceCall("Config/Webinterface/ChangePassword/",
            $("#change_password").val(), "POST", function (a) {
                "1" == a && $("#change_password").val("")
            })
    });
    $("#control_groupslist").on("collapsibleexpand", function (d) {
        Cookies.set("sel_group", d.target.id)
    })
};
Ha.WebApp.Control.LogOff = function () {
    Ha.WebApp.Events.es.close();
    try {
        Ha.Data.ServiceCall("Config/Webinterface/LogOff/", null, "POST", function (a) {
        }, !1)
    } catch (d) {
    }
    setTimeout(function () {
        window.location.href = "about:blank"
    }, 1E3)
};
Ha.WebApp.Control.OpenConfig = function () {
    Ha.Data.ServiceCall("Config/Webinterface/IsAdmin/", null, "GET", function (d) {
        "1" == d ? window.open("#page_config", "_parent") : alert("You are not authorized to see this page!")
    })
};
Ha.WebApp.Control.ChartDisplayData = function (d) {
    var a = $.plot("#placeholder", d, {
        xaxis: {mode: "time", timezone: "browser"},
        lines: {show: !0},
        grid: {hoverable: !0},
        selection: {mode: "x"}
    });
    $("<div id='tooltip'></div>").css({
        position: "absolute",
        display: "none",
        border: "1px solid #fdd",
        padding: "2px",
        "background-color": "#fee",
        opacity: .8
    }).appendTo("body");
    $("#placeholder").bind("plothover", function (a, d, f) {
        f ? (a = f.datapoint[1].toFixed(2), d = new Date(f.datapoint[0]), $("#tooltip").html(f.series.label + ": " + Ha.WebApp.Utility.FormatDate(d) +
                " " + Ha.WebApp.Utility.FormatDateTime(d, !0) + " = " + a).css({
                top: f.pageY + 5,
                left: f.pageX + 5
            }).fadeIn(200)) : $("#tooltip").hide()
    });
    $("#placeholder").unbind("plotselected");
    $("#placeholder").bind("plotselected", function (b, d) {
        $.each(a.getXAxes(), function (a, b) {
            var h = b.options;
            h.min = d.xaxis.from;
            h.max = d.xaxis.to
        });
        a.setupGrid();
        a.draw();
        a.clearSelection()
    });
    $(".chart1").resizable({maxWidth: 900, maxHeight: 500, minWidth: 450, minHeight: 250})
};
Ha.WebApp.Control.ChartSetYAxis = function () {
    for (var d = 1, a = 0; a < Ha.WebApp.Control.Dataset.length; a++)Ha.WebApp.Control.Dataset[a].yaxis = d, d += 1
};
Ha.WebApp.Control.ChartLoadData = function () {
    for (var d = $('input[name="radio-chart-horizont"]:checked').val(), a = 0; a < Ha.Data.Modules.length; a++)for (var b = Ha.Data.Modules[a], e = 0; e < b.Properties.length; e++) {
        var f = b.Properties[e];
        if ($("#cbx_chart_" + a + "_" + e).is(":checked")) {
            for (var g = !1, h = 0; h < Ha.WebApp.Control.Dataset.length; h++) {
                var l = Ha.WebApp.Control.Dataset[h];
                l.domain == b.Domain && l.address == b.Address && l.property == f.Name && l.mode == d && (g = !0)
            }
            g || Ha.Data.ServiceCall("Control/Data/" + b.Domain + "/" + b.Address + "/" +
                f.Name + "/" + d, null, "GET", function (a) {
                for (var b = 0; b < Ha.WebApp.Control.Dataset.length; b++) {
                    var e = Ha.WebApp.Control.Dataset[b];
                    if (e.domain == a.domain && e.address == a.address && e.property == a.property) {
                        Ha.WebApp.Control.Dataset.splice(b, 1);
                        break
                    }
                }
                for (b = 0; b < Ha.Data.Modules.length; b++)for (var e = Ha.Data.Modules[b], f = 0; f < e.Properties.length; f++) {
                    var g = e.Properties[f];
                    a.domain == e.Domain && a.address == e.Address && a.property == g.Name && a.mode == d && $("#cbx_chart_" + b + "_" + f).is(":checked") && Ha.WebApp.Control.Dataset.push(a)
                }
                Ha.WebApp.Control.ChartSetYAxis();
                Ha.WebApp.Control.ChartDisplayData(Ha.WebApp.Control.Dataset)
            })
        } else for (h = 0; h < Ha.WebApp.Control.Dataset.length; h++)l = Ha.WebApp.Control.Dataset[h], l.domain == b.Domain && l.address == b.Address && l.property == f.Name && (Ha.WebApp.Control.Dataset.splice(h, 1), Ha.WebApp.Control.ChartSetYAxis(), Ha.WebApp.Control.ChartDisplayData(Ha.WebApp.Control.Dataset))
    }
};
Ha.WebApp.Control.ChartHorizontChanged = function () {
    Ha.WebApp.Control.Dataset = [];
    Ha.WebApp.Control.ChartDisplayData(Ha.WebApp.Control.Dataset);
    Ha.WebApp.Control.ChartLoadData()
};
Ha.WebApp.Control.InitChart = function () {
    $("#radio-choice-chart-2a").prop("checked", "checked");
    $("#radio-choice-chart-2a").checkboxradio("refresh");
    $("#radio-choice-chart-2b").checkboxradio("refresh");
    $("#radio-choice-chart-2c").checkboxradio("refresh");
    $("#radio-choice-chart-2d").checkboxradio("refresh");
    Ha.Data.ServiceCall("Config/Module/List/", null, "GET", function (d) {
        Ha.Data.Modules = d.Modules;
        d = $("#control_groupslist").attr("selected-domain");
        var a = $("#control_groupslist").attr("selected-address");
        Ha.WebApp.Configure.SelectedModule = Ha.Data.Module.GetModuleByDomainAddress(d, a);
        $("#chart_parameters").empty();
        for (var b = 0; b < Ha.Data.Modules.length; b++) {
            for (var e = Ha.Data.Modules[b], f = "", g = !1, h = 0; h < e.Properties.length; h++) {
                var l = e.Properties[h];
                if ("true" == l.LogToDatabase || "True" == l.LogToDatabase) g = !0
            }
            if (g) {
                f += '<div id="module-id"=' + b + ">";
                f += '<fieldset data-role="controlgroup">';
                f += "<legend><b>" + e.Description + '</b> <span style="color: gray">' + e.Domain + " " + e.Address + "</span></legend>";
                for (h = 0; h < e.Properties.length; h++)if (l =
                        e.Properties[h], "true" == l.LogToDatabase || "True" == l.LogToDatabase) f += '<input type="checkbox" id="cbx_chart_' + b + "_" + h + '" ', e.Address == a && e.Domain == d && (f += 'checked="checked"'), f += ' onchange="javascript:Ha.WebApp.Control.ChartLoadData();">', f = "" != l.Description ? f + ('<label for="cbx_chart_' + b + "_" + h + '">' + l.Description) : f + ('<label for="cbx_chart_' + b + "_" + h + '">' + l.Name), "" != l.Unit && (f += " (" + l.Unit + ")"), f += "</label>";
                f += "</fieldset>";
                f += "</div>";
                $("#chart_parameters").append(f)
            }
        }
        $("#chart_parameters").trigger("create");
        Ha.WebApp.Control.Dataset = [];
        Ha.WebApp.Control.ChartDisplayData(Ha.WebApp.Control.Dataset);
        Ha.WebApp.Control.ChartLoadData()
    })
};
Ha.WebApp.Configure = Ha.WebApp.Configure || {};
Ha.WebApp.Configure.SelectedModule = null;
Ha.WebApp.Configure.SelectedModuleProperty = null;
Ha.WebApp.Configure.MQTTNodeTmp = null;
Ha.WebApp.Configure.InitMySensorsDriver = function () {
    $("[id=configure_driver_mysensorsoptions]").each(function () {
        $(this).hide()
    });
    $("#configure_driver_mysensors_enabled").unbind("slidestop");
    Ha.Data.ServiceCall("Config/Driver/MySensors/GetIsEnabled/", null, "GET", function (d) {
        $("#configure_driver_mysensors_enabled").val(d).slider("refresh");
        "0" != $("#configure_driver_mysensors_enabled").val() ? $("[id=configure_driver_mysensorsoptions]").each(function () {
                $(this).show()
            }) : $("[id=configure_driver_mysensorsoptions]").each(function () {
                $(this).hide()
            })
    });
    $("#configure_driver_mysensors_enabled").on("slidestop", function (d) {
        Ha.Data.ServiceCall("Config/Driver/MySensors/SetIsEnabled/" + $("#configure_driver_mysensors_enabled").val() + "/", null, "POST", function (a) {
            $("#configure_driver_mysensors_enabled").val(a).slider("refresh");
            "0" != $("#configure_driver_mysensors_enabled").val() ? $("[id=configure_driver_mysensorsoptions]").each(function () {
                    $(this).show()
                }) : $("[id=configure_driver_mysensorsoptions]").each(function () {
                    $(this).hide()
                })
        })
    });
    $("#configure_driver_mysensorschannel").unbind("slidestop");
    Ha.Data.ServiceCall("Config/Driver/MySensors/GetChannel/", null, "GET", function (d) {
        $("#configure_driver_mysensorschannel").val(d).slider("refresh")
    });
    $("#configure_driver_mysensorschannel").on("slidestop", function (d, a) {
        Ha.Data.ServiceCall("Config/Driver/MySensors/SetChannel/" + $("#configure_driver_mysensorschannel").val() + "/", null, "GET", function (a) {
            $("#configure_driver_mysensorschannel").val(a).slider("refresh")
        })
    });
    $("#configure_driver_mysensorsbaseradioid").unbind("change");
    Ha.Data.ServiceCall("Config/Driver/MySensors/GetBaseRadioId/",
        null, "GET", function (d) {
            $("#configure_driver_mysensorsbaseradioid").val(d)
        });
    $("#configure_driver_mysensorsbaseradioid").on("change", function (d) {
        Ha.Data.ServiceCall("Config/Driver/MySensors/SetBaseRadioId/" + $("#configure_driver_mysensorsbaseradioid").val(), null, "POST", function (a) {
            $("#configure_driver_mysensorsbaseradioid").val(a)
        })
    });
    $("#configure_driver_mysensorsdatarate").unbind("change");
    Ha.Data.ServiceCall("Config/Driver/MySensors/GetDataRate/", null, "GET", function (d) {
        $("#configure_driver_mysensorsdatarate").val(d);
        $("#configure_driver_mysensorsdatarate").selectmenu("refresh")
    });
    $("#configure_driver_mysensorsdatarate").on("change", function (d) {
        Ha.Data.ServiceCall("Config/Driver/MySensors/SetDataRate/" + $("#configure_driver_mysensorsdatarate").val(), null, "POST", function (a) {
            $("#configure_driver_mysensorsdatarate").val(a);
            $("#configure_driver_mysensorsdatarate").selectmenu("refresh")
        })
    });
    $("#configure_driver_mysensorspalevel").unbind("change");
    Ha.Data.ServiceCall("Config/Driver/MySensors/GetPowerAmplifierLevel/",
        null, "GET", function (d) {
            $("#configure_driver_mysensorspalevel").val(d);
            $("#configure_driver_mysensorspalevel").selectmenu("refresh")
        });
    $("#configure_driver_mysensorspalevel").on("change", function (d) {
        Ha.Data.ServiceCall("Config/Driver/MySensors/SetPowerAmplifierLevel/" + $("#configure_driver_mysensorspalevel").val(), null, "POST", function (a) {
            $("#configure_driver_mysensorspalevel").val(a);
            $("#configure_driver_mysensorspalevel").selectmenu("refresh")
        })
    });
    $("#configure_driver_mysensors_debug").unbind("slidestop");
    Ha.Data.ServiceCall("Config/Driver/MySensors/GetDebugMode/", null, "GET", function (d) {
        $("#configure_driver_mysensors_debug").val(d).slider("refresh")
    });
    $("#configure_driver_mysensors_debug").on("slidestop", function (d) {
        Ha.Data.ServiceCall("Config/Driver/MySensors/SetDebugMode/" + $("#configure_driver_mysensors_debug").val() + "/", null, "POST", function (a) {
            $("#configure_driver_mysensors_debug").val(a).slider("refresh")
        })
    });
    $("#configure_driver_mysensorsremovenode_popup").unbind("popupbeforeposition");
    $("#configure_driver_mysensorsremovenode_popup").on("popupbeforeposition",
        function (d) {
            Ha.WebApp.Configure.DriverModuleListViewItems("MySensors", function (a) {
                $("#configure_driver_mysensorsremovenode").empty();
                $("#configure_driver_mysensorsremovenode").append(a);
                $("#configure_driver_mysensorsremovenode").selectmenu("refresh")
            })
        });
    $("#configure_driver_mysensorsremovenode_button").unbind("click");
    $("#configure_driver_mysensorsremovenode_button").on("click", function (d) {
        var a = $("#configure_driver_mysensorsremovenode").find(":selected");
        d = a.attr("data-context-domain");
        a = a.attr("data-context-value");
        null != d && Ha.WebApp.Configure.RemoveModule(d, a)
    })
};
Ha.WebApp.Configure.InitEsp8266EasyIoTDriver = function () {
    $("[id=configure_driver_esp8266easyiotoptions]").each(function () {
        $(this).hide()
    });
    $("#configure_driver_esp8266easyiot_enabled").unbind("slidestop");
    Ha.Data.ServiceCall("Config/Driver/Esp8266/GetIsEnabled/", null, "GET", function (d) {
        $("#configure_driver_esp8266easyiot_enabled").val(d).slider("refresh");
        "0" != $("#configure_driver_esp8266easyiot_enabled").val() ? $("[id=configure_driver_esp8266easyiotoptions]").each(function () {
                $(this).show()
            }) : $("[id=configure_driver_esp8266easyiotoptions]").each(function () {
                $(this).hide()
            })
    });
    $("#configure_driver_esp8266easyiot_enabled").on("slidestop", function (d) {
        Ha.Data.ServiceCall("Config/Driver/Esp8266/SetIsEnabled/" + $("#configure_driver_esp8266easyiot_enabled").val() + "/", null, "POST", function (a) {
            $("#configure_driver_esp8266easyiot_enabled").val(a).slider("refresh");
            "0" != $("#configure_driver_esp8266easyiot_enabled").val() ? $("[id=configure_driver_esp8266easyiotoptions]").each(function () {
                    $(this).show()
                }) : $("[id=configure_driver_esp8266easyiotoptions]").each(function () {
                    $(this).hide()
                })
        })
    });
    $("#configure_driver_esp8266easyiot_debug").unbind("slidestop");
    Ha.Data.ServiceCall("Config/Driver/Esp8266/GetDebugMode/", null, "GET", function (d) {
        $("#configure_driver_esp8266easyiot_debug").val(d).slider("refresh")
    });
    $("#configure_driver_esp8266easyiot_debug").on("slidestop", function (d) {
        Ha.Data.ServiceCall("Config/Driver/Esp8266/SetDebugMode/" + $("#configure_driver_esp8266easyiot_debug").val() + "/", null, "POST", function (a) {
            $("#configure_driver_esp8266easyiot_debug").val(a).slider("refresh")
        })
    });
    $("#configure_driver_esp8266easyiot_port").unbind("change");
    Ha.Data.ServiceCall("Config/Driver/Esp8266/GetPort", null, "GET", function (d) {
        $("#configure_driver_esp8266easyiot_port").val(d)
    });
    $("#configure_driver_esp8266easyiot_port").on("change", function (d) {
        Ha.Data.ServiceCall("Config/Driver/Esp8266/SetPort/" + $("#configure_driver_esp8266easyiot_port").val(), null, "POST", function (a) {
            $("#configure_driver_esp8266easyiot_port").val(a)
        })
    });
    $("#configure_driver_esp8266easyiotremovenode_popup").unbind("popupbeforeposition");
    $("#configure_driver_esp8266easyiotremovenode_popup").on("popupbeforeposition",
        function (d) {
            Ha.WebApp.Configure.DriverModuleListViewItems("Esp8266", function (a) {
                $("#configure_driver_esp8266easyiotremovenode").empty();
                $("#configure_driver_esp8266easyiotremovenode").append(a);
                $("#configure_driver_esp8266easyiotremovenode").selectmenu("refresh")
            })
        });
    $("#configure_driver_esp8266easyiotremovenode_button").unbind("click");
    $("#configure_driver_esp8266easyiotremovenode_button").on("click", function (d) {
        var a = $("#configure_driver_esp8266easyiotremovenode").find(":selected");
        d = a.attr("data-context-domain");
        a = a.attr("data-context-value");
        null != d && Ha.WebApp.Configure.RemoveModule(d, a)
    })
};
Ha.WebApp.Configure.InitVirtualDriver = function () {
    $("[id=configure_driver_virtualoptions]").each(function () {
        $(this).hide()
    });
    $("#configure_driver_virual_enabled").unbind("slidestop");
    Ha.Data.ServiceCall("Config/Driver/Virtual/GetIsEnabled/", null, "GET", function (d) {
        $("#configure_driver_virual_enabled").val(d).slider("refresh");
        "0" != $("#configure_driver_virual_enabled").val() ? $("[id=configure_driver_virtualoptions]").each(function () {
                $(this).show()
            }) : $("[id=configure_driver_virtualoptions]").each(function () {
                $(this).hide()
            })
    });
    $("#configure_driver_virual_enabled").on("slidestop", function (d) {
        Ha.Data.ServiceCall("Config/Driver/Virtual/SetIsEnabled/" + $("#configure_driver_virual_enabled").val() + "/", null, "POST", function (a) {
            $("#configure_driver_virual_enabled").val(a).slider("refresh");
            "0" != $("#configure_driver_virual_enabled").val() ? $("[id=configure_driver_virtualoptions]").each(function () {
                    $(this).show()
                }) : $("[id=configure_driver_virtualoptions]").each(function () {
                    $(this).hide()
                })
        })
    });
    $("#configure_driver_virtual_debug").unbind("slidestop");
    Ha.Data.ServiceCall("Config/Driver/Virtual/GetDebugMode/", null, "GET", function (d) {
        $("#configure_driver_virtual_debug").val(d).slider("refresh")
    });
    $("#configure_driver_virtual_debug").on("slidestop", function (d) {
        Ha.Data.ServiceCall("Config/Driver/Virtual/SetDebugMode/" + $("#configure_driver_virtual_debug").val() + "/", null, "POST", function (a) {
            $("#configure_driver_virtual_debug").val(a).slider("refresh")
        })
    });
    $("#configure_driver_virtual_removenode_popup").unbind("popupbeforeposition");
    $("#configure_driver_virtual_removenode_popup").on("popupbeforeposition",
        function (d) {
            Ha.WebApp.Configure.DriverModuleListViewItems("Virtual", function (a) {
                $("#configure_driver_virtual_removenode").empty();
                $("#configure_driver_virtual_removenode").append(a);
                $("#configure_driver_virtual_removenode").selectmenu("refresh")
            })
        });
    $("#configure_driver_virtual_removenode_button").unbind("click");
    $("#configure_driver_virtual_removenode_button").on("click", function (d) {
        var a = $("#configure_driver_virtual_removenode").find(":selected");
        d = a.attr("data-context-domain");
        a = a.attr("data-context-value");
        null != d && Ha.WebApp.Configure.RemoveModule(d, a)
    })
};
Ha.WebApp.Configure.InitPage = function () {
    $("[data-role=popup]").on("popupbeforeposition", function (d) {
        "control_group_add" == this.id && $("#group_new_name").val("")
    });
    $("#group_new_button").bind("click", function (d) {
        Ha.WebApp.Configure.GroupAdd($("#group_new_name").val())
    });
    $("#config_module_update_button").bind("click", function (d) {
        Ha.WebApp.Configure.SelectedModule.Description = $("#config_module_name").val();
        Ha.WebApp.Configure.SelectedModule.DeviceType = $("#config_module_type").val();
        if ("S_ANALOG_OUTPUT" ==
            Ha.WebApp.Configure.SelectedModule.DeviceType || "S_TEMP_AO" == Ha.WebApp.Configure.SelectedModule.DeviceType || "S_HUM_AO" == Ha.WebApp.Configure.SelectedModule.DeviceType || "S_DIMMER" == Ha.WebApp.Configure.SelectedModule.DeviceType || "S_COVER" == Ha.WebApp.Configure.SelectedModule.DeviceType) d = Ha.WebApp.Utility.GetModulePropertyByName(Ha.WebApp.Configure.SelectedModule, "Settings.MinValue"), null == d && Ha.WebApp.Utility.SetModulePropertyByName(Ha.WebApp.Configure.SelectedModule, "Settings.MinValue", "0", null), d = Ha.WebApp.Utility.GetModulePropertyByName(Ha.WebApp.Configure.SelectedModule,
            "Settings.MaxValue"), null == d && Ha.WebApp.Utility.SetModulePropertyByName(Ha.WebApp.Configure.SelectedModule, "Settings.MaxValue", "100", null), d = Ha.WebApp.Utility.GetModulePropertyByName(Ha.WebApp.Configure.SelectedModule, "Settings.ValueStep"), null == d && Ha.WebApp.Utility.SetModulePropertyByName(Ha.WebApp.Configure.SelectedModule, "Settings.ValueStep", "1", null);
        Ha.Data.ServiceCall("Config/Module/SaveAll/", JSON.stringify(Ha.Data.Modules), "POST", function () {
            Ha.WebApp.Configure.ReloadModules()
        })
    });
    $("#config_module_remove_button").bind("click",
        function (d) {
            Ha.Data.Module.RemoveFromGroup(selectedGroupName, Ha.WebApp.Configure.SelectedModule.Domain, Ha.WebApp.Configure.SelectedModule.Address, function () {
                Ha.WebApp.Configure.ReloadModules()
            })
        });
    $("#config_group_module_properties").on("popupbeforeposition", function (d) {
        Ha.WebApp.Configure.LoadModuleParameters()
    });
    $("#config_groupmodules_groupname").change(function () {
        selectedGroupName = $("#config_groupslist").attr("selected-group-name");
        Ha.Data.ServiceCall("Config/Group/Rename/" + selectedGroupName,
            $("#config_groupmodules_groupname").val(), "POST", function (d) {
                $("#config_groupslist").attr("selected-group-name", $("#config_groupmodules_groupname").val())
            })
    });
    $("#groupmodules_group_delete_button").bind("click", function (d) {
        selectedGroupName = $("#config_groupslist").attr("selected-group-name");
        Ha.WebApp.Configure.GroupDelete(selectedGroupName)
    });
    $("#groupmodules_group_modulechoose").on("popupbeforeposition", function (d) {
        $("#groupmodules_group_moduleadd").empty();
        selectedGroupName = $("#config_groupslist").attr("selected-group-name");
        $("#groupmodules_group_moduleadd").append(Ha.WebApp.Configure.GroupNewModuleListViewItems(selectedGroupName));
        $("#groupmodules_group_moduleadd").selectmenu("refresh")
    });
    $("#groupmodules_group_moduleadd_button").bind("click", function (d) {
        var a = $("#groupmodules_group_moduleadd").find(":selected");
        d = a.attr("data-context-domain");
        a = a.attr("data-context-value");
        selectedGroupName = $("#config_groupslist").attr("selected-group-name");
        Ha.WebApp.Configure.AddGroupModule(selectedGroupName, d, a)
    })
};
Ha.WebApp.Configure.RenderGroups = function () {
    $("#config_groupslist").empty();
    for (var d = '<li data-role="list-divider">Groups</li>', a = 0; a < Ha.Data.Groups.length; a++)group = Ha.Data.Groups[a], d += '<li data-group-name="' + group.GroupName + '"><a href="#page_groupmodules_groupmodules" data-transition="slide">' + group.GroupName + '<span class="ui-li-count">' + group.Modules.length + "</span></a></li>";
    $("#config_groupslist").append(d);
    $("#config_groupslist li").unbind("click");
    $("#config_groupslist li").bind("click",
        function () {
            $("#config_groupslist").attr("selected-group-name", $(this).attr("data-group-name"))
        });
    $("#config_groupslist").listview("refresh")
};
Ha.WebApp.Configure.ReloadGroups = function () {
    Ha.Data.ServiceCall("Config/Group/List", null, "GET", function (d) {
        Ha.Data.Groups = d.Groups;
        Ha.WebApp.Configure.RenderGroups()
    })
};
Ha.WebApp.Configure.GroupAdd = function (d) {
    Ha.Data.ServiceCall("Config/Group/Add", d, "POST", function (a) {
        Ha.WebApp.Configure.ReloadGroups()
    })
};
Ha.WebApp.Configure.GroupDelete = function (d) {
    Ha.Data.ServiceCall("Config/Group/Delete", d, "POST", function (a) {
        $.mobile.changePage($("#page_groupmodules_groups"), {transition: "reverse"})
    })
};
Ha.WebApp.Configure.ModuleEdit = function (d) {
    d = d.attr("data-module-index");
    selectedGroupName = $("#config_groupslist").attr("selected-group-name");
    var a = Ha.Data.Module.ListGroupModules(selectedGroupName);
    Ha.WebApp.Configure.SelectedModule = Ha.Data.Module.GetModuleByDomainAddress(a.Modules[d].Domain, a.Modules[d].Address);
    null != Ha.WebApp.Configure.SelectedModule && ($("#config_module_name").val(Ha.WebApp.Configure.SelectedModule.Description), $("#config_module_title").html(Ha.WebApp.Configure.SelectedModule.Domain +
        " " + Ha.WebApp.Configure.SelectedModule.Address + " - Settings"), $("#config_module_type option:selected").removeAttr("selected"), $("#config_module_type").val(Ha.WebApp.Configure.SelectedModule.DeviceType).attr("selected", !0).siblings("option"), Ha.WebApp.Configure.ModuleUpdateType(Ha.WebApp.Configure.SelectedModule.DeviceType), $("#module_icon").attr("src", Ha.WebApp.Utility.GetIconForModule(Ha.WebApp.Configure.SelectedModule)), $("#config_module_type").selectmenu("refresh"))
};
Ha.WebApp.Configure.ModuleUpdateType = function (d) {
    null != Ha.WebApp.Configure.SelectedModule && (Ha.WebApp.Configure.SelectedModule.DeviceType = d, d = Ha.WebApp.Utility.GetIconForModule(Ha.WebApp.Configure.SelectedModule), $("#module_icon").attr("src", d))
};
Ha.WebApp.Configure.GroupNewModuleListViewItems = function (d) {
    d = Ha.Data.Module.ListGroupModules(d);
    var a = "", b = "";
    for (m = 0; m < Ha.Data.Modules.length; m++) {
        var e = Ha.Data.Modules[m];
        if (0 == $.grep(d.Modules, function (a) {
                return a.Domain == e.Domain && a.Address == e.Address
            }).length) {
            b != e.Domain && (b = e.Domain, a += '<optgroup label="' + b + '"></optgroup>');
            var f = "" != e.Description ? e.Description : e.DeviceType, f = f + (" (" + e.Address + ")"), a = a + ('<option data-context-domain="' + e.Domain + '" data-context-value="' + e.Address + '">' + f + "</option>")
        }
    }
    return a
};
Ha.WebApp.Configure.ModulePropertyAdd2 = function (d, a, b, e, f, g, h, l, p) {
    var k = !1;
    l1 = h ? "true" : "false";
    l2 = l ? "true" : "false";
    l3 = p ? "true" : "false";
    for (h = 0; h < d.Properties.length; h++)if (d.Properties[h].Name == a) {
        d.Properties[h].Description = b;
        d.Properties[h].Value = e;
        d.Properties[h].Unit = f;
        d.Properties[h].AvreageInterval = g;
        d.Properties[h].LogToDatabase = l1;
        d.Properties[h].DisableUINotification = l2;
        d.Properties[h].ChartSteps = l3;
        k = !0;
        break
    }
    k || d.Properties.push({
        Name: a, Description: b, Value: e, Unit: f, AvreageInterval: g, LogToDatabase: l1,
        DisableUINotification: l2, ChartSteps: l3
    })
};
Ha.WebApp.Configure.ModulePropertyAdd = function (d, a, b, e, f, g) {
    Ha.WebApp.Configure.ModulePropertyAdd2(d, a, "", b, "", 0, e, f, g)
};
Ha.WebApp.Configure.ModulePropertyDelete = function (d) {
    for (var a = Ha.WebApp.Configure.SelectedModule, b = 0; b < a.Properties.length; b++)a.Properties[b].Name == d && (delete a.Properties[b], a.Properties.splice(b, 1))
};
Ha.WebApp.Configure.UpdateCurrentModuleParameter = function () {
    var d = Ha.WebApp.Configure.SelectedModuleProperty.find("[data-ui-field=name]").val(), a = Ha.WebApp.Configure.SelectedModuleProperty.find("[data-ui-field=value]").val(), b = Ha.WebApp.Configure.SelectedModuleProperty.find("[data-ui-field=description]").val(), e = Ha.WebApp.Configure.SelectedModuleProperty.find("[data-ui-field=unit]").val(), f = Ha.WebApp.Configure.SelectedModuleProperty.find("[data-ui-field=avreageinteral]").val(), g = Ha.WebApp.Configure.SelectedModuleProperty.find("[data-ui-field=logtodatabase]").is(":checked"),
        h = Ha.WebApp.Configure.SelectedModuleProperty.find("[data-ui-field=disableuinotification]").is(":checked"), l = Ha.WebApp.Configure.SelectedModuleProperty.find("[data-ui-field=chartsteps]").is(":checked");
    Ha.WebApp.Configure.ModulePropertyAdd2(Ha.WebApp.Configure.SelectedModule, d, b, a, e, f, g, h, l);
    Ha.WebApp.Configure.LoadModuleParameters()
};
Ha.WebApp.Configure.LoadModuleParameters = function () {
    $("#config_group_module_params").empty();
    Ha.WebApp.Configure.SelectedModuleProperty = null;
    if (null != Ha.WebApp.Configure.SelectedModule && null != Ha.WebApp.Configure.SelectedModule.Properties)for (var d = 0; d < Ha.WebApp.Configure.SelectedModule.Properties.length; d++) {
        var a = "<li>", a = a + '        <div class="ui-grid-a">', a = a + '            <div class="ui-block-a" style="padding-right:7.5px;padding-top:15px;width:30%;">Name</div>', a = a + ('            <div class="ui-block-b" style="padding-right:7.5px;width:70%;"><input data-ui-field="name" type="text" value="' +
                Ha.WebApp.Configure.SelectedModule.Properties[d].Name + '" onchange="Ha.WebApp.Configure.UpdateCurrentModuleParameter()" style="font-size:11pt" -class="ui-disabled" /></div>'), a = a + "        </div>", a = a + '        <div class="ui-grid-a">', a = a + '            <div class="ui-block-a" style="padding-right:7.5px;padding-top:15px;width:30%;">Description</div>', a = a + ('            <div class="ui-block-b" style="padding-left:7.5px;width:70%;"><input data-ui-field="description" type="text" value="' + Ha.WebApp.Configure.SelectedModule.Properties[d].Description +
                '" onchange="Ha.WebApp.Configure.UpdateCurrentModuleParameter()" style="font-size:11pt" -class="ui-disabled" /></div>'), a = a + "        </div>", a = a + '        <div class="ui-grid-a">', a = a + '            <div class="ui-block-a" style="padding-right:7.5px;padding-top:15px;width:30%;">Value</div>', a = a + ('            <div class="ui-block-b" style="padding-left:7.5px;width:30%;"><input data-ui-field="value" type="text" value="' + Ha.WebApp.Configure.SelectedModule.Properties[d].Value + '" onchange="Ha.WebApp.Configure.UpdateCurrentModuleParameter()" style="font-size:11pt" -class="ui-disabled" /></div>'),
            a = a + "        </div>", a = a + '        <div class="ui-grid-a">', a = a + '            <div class="ui-block-a" style="padding-right:7.5px;padding-top:15px;width:30%;">Unit</div>', a = a + ('            <div class="ui-block-b" style="padding-left:7.5px;width:70%;"><input data-ui-field="unit" type="text" value="' + Ha.WebApp.Configure.SelectedModule.Properties[d].Unit + '" onchange="Ha.WebApp.Configure.UpdateCurrentModuleParameter()" style="font-size:11pt" -class="ui-disabled" /></div>'), a = a + "        </div>", a = a + '        <div class="ui-grid-a">',
            a = a + '            <div class="ui-block-a" style="padding-right:7.5px;padding-top:15px;width:30%;">Avg (min)</div>', a = a + ('            <div class="ui-block-b" style="padding-left:7.5px;width:70%;"><input data-ui-field="avreageinteral" type="text" value="' + Ha.WebApp.Configure.SelectedModule.Properties[d].AvreageInterval + '" onchange="Ha.WebApp.Configure.UpdateCurrentModuleParameter()" style="font-size:11pt" -class="ui-disabled" /></div>'), a = a + "        </div>", a = a + '       <div class="ui-grid-solo">', a =
                a + '           <div class="ui-block-a"><label><input type="checkbox" data-ui-field="disableuinotification" ';
        "false" != Ha.WebApp.Configure.SelectedModule.Properties[d].DisableUINotification && (a += 'checked="checked"');
        a += ' onchange="Ha.WebApp.Configure.UpdateCurrentModuleParameter()"  >Disable UI notifiction</label></div>';
        a += "       </div>";
        a += '       <div class="ui-grid-solo">';
        a += '           <div class="ui-block-a"><label><input type="checkbox" data-ui-field="logtodatabase" ';
        "false" != Ha.WebApp.Configure.SelectedModule.Properties[d].LogToDatabase &&
        (a += 'checked="checked"');
        a += ' onchange="Ha.WebApp.Configure.UpdateCurrentModuleParameter()"  >Log to database</label></div>';
        a += "       </div>";
        a += '       <div class="ui-grid-solo">';
        a += '           <div class="ui-block-a"><label><input type="checkbox" data-ui-field="chartsteps" ';
        "false" != Ha.WebApp.Configure.SelectedModule.Properties[d].ChartSteps && (a += 'checked="checked"');
        a += ' onchange="Ha.WebApp.Configure.UpdateCurrentModuleParameter()"  >Chart steps</label></div>';
        a += "       </div>";
        a += "   </li>";
        $("#config_group_module_params").append(a)
    }
    $("#config_group_module_params").trigger("create");
    $("#config_group_module_params").listview().listview("refresh");
    $("#config_group_module_params input").focus(function () {
        var a = $(this).closest("div").parent().parent().parent();
        "#E6E6FA" != a.css("background") && ($(this).attr("originalbackground", a.css("background")), a.css("background", "#E6E6FA"), setTimeout("$('#automation_group_module_propdelete').removeClass('ui-disabled')", 500), Ha.WebApp.Configure.SelectedModuleProperty =
            a)
    });
    $("#config_group_module_params input").click(function () {
        var a = $(this).closest("div").parent().parent().parent();
        a.css("background", "#E6E6FA");
        setTimeout("$('#automation_group_module_propdelete').removeClass('ui-disabled')", 500);
        Ha.WebApp.Configure.SelectedModuleProperty = a
    });
    $("#config_group_module_params input").blur(function () {
        $(this).closest("div").parent().parent().parent().css("background", $(this).attr("originalbackground"));
        setTimeout("$('#automation_group_module_propdelete').addClass('ui-disabled')",
            250)
    })
};
Ha.WebApp.Configure.ModulePropertyAdd1 = function (d, a) {
    Ha.WebApp.Configure.ModulePropertyAdd(Ha.WebApp.Configure.SelectedModule, d, a, "false", "false", "false");
    Ha.Data.ServiceCall("Config/Module/Update/", JSON.stringify(Ha.WebApp.Configure.SelectedModule), "POST", null);
    Ha.WebApp.Configure.LoadModuleParameters()
};
Ha.WebApp.Configure.ModulePropertyDelete1 = function () {
    null != Ha.WebApp.Configure.SelectedModuleProperty && (Ha.WebApp.Configure.ModulePropertyDelete(Ha.WebApp.Configure.SelectedModuleProperty.find("input[type=text]").first().val()), Ha.WebApp.Configure.SelectedModuleProperty.remove(), Ha.WebApp.Configure.SelectedModuleProperty = null, Ha.Data.ServiceCall("Config/Module/Update/", JSON.stringify(Ha.WebApp.Configure.SelectedModule), "POST", null))
};
Ha.WebApp.Configure.RenderModules = function (d) {
    selectedGroupName = $("#config_groupslist").attr("selected-group-name");
    $("#config_groupmodules_groupname").val(selectedGroupName);
    var a = Ha.Data.Module.ListGroupModules(selectedGroupName);
    $("#config_groupmodulelist").empty();
    for (var b = '<li data-role="list-divider">Modules</li>', e = 0; e < a.Modules.length; e++)module = a.Modules[e], b += '<li data-module-index="' + e + '"><a href="#config_group_module_edit" data-rel="popup" data-transition="pop">', b += "<img src=" + Ha.WebApp.Utility.GetIconForModule(module) +
        ">", b += "<h2>" + module.Description + "</h2>", b += "<p><b>" + module.Domain + "</b> " + module.Address + "</p></a>", b += '<a href="#config_group_module_properties" data-rel="popup" data-transition="pop">' + module.Address + "</a></li>";
    $("#config_groupmodulelist").append(b);
    $("#config_groupmodulelist li").on("click", function () {
        Ha.WebApp.Configure.ModuleEdit($(this))
    });
    $("#config_groupmodulelist").listview("refresh");
    null != d && d()
};
Ha.WebApp.Configure.ReloadModules = function (d) {
    Ha.Data.ServiceCall("Config/Module/List/", null, "GET", function (a) {
        Ha.Data.Modules = a.Modules;
        Ha.Data.ServiceCall("Config/Group/List", null, "GET", function (a) {
            Ha.Data.Groups = a.Groups;
            Ha.WebApp.Configure.RenderModules(d)
        })
    })
};
Ha.WebApp.Configure.AddGroupModule = function (d, a, b) {
    var e = !1;
    for (i = 0; i < Ha.Data.Groups.length; i++)if (Ha.Data.Groups[i].GroupName == d) {
        for (c = 0; c < Ha.Data.Groups[i].Modules.length; c++)if (a == Ha.Data.Groups[i].Modules[c].Domain && b == Ha.Data.Groups[i].Modules[c].Address) {
            e = !0;
            break
        }
        e || Ha.Data.Groups[i].Modules.push({Address: b, Domain: a});
        break
    }
    Ha.Data.ServiceCall("Config/Group/SaveAll", JSON.stringify(Ha.Data.Groups), "POST", function (a) {
        Ha.WebApp.Configure.ReloadModules(function () {
            Ha.WebApp.Configure.ModuleEdit($("#config_groupmodulelist li").last());
            setTimeout("$('#config_group_module_edit').popup('open', { transition: 'pop' });", 1E3)
        })
    })
};
Ha.WebApp.Configure.MySensorsNodeAdd = function () {
    $("#configure_driver_mysensorsaddnode_popup").popup("open");
    $("#configure_driver_mysensors_nodeid").html("");
    $("#configure_driver_mysensors_message").html("This operation will timeout in 30 seconds.");
    $("#configure_driver_mysensors_close_button").addClass("ui-disabled");
    Ha.Data.ServiceCall("Config/Driver/MySensors/AddNode/", null, "POST", function (d) {
        0 != d ? ($("#configure_driver_mysensors_nodeid").html(d), $("#configure_driver_mysensors_message").html("node added.")) :
            ($("#configure_driver_mysensors_nodeid").html('<span style="color:red">timed out</span>'), $("#configure_driver_mysensors_message").html("Operation falied."));
        $("#configure_driver_mysensors_instructions").html("");
        $("#configure_driver_mysensors_close_button").removeClass("ui-disabled")
    })
};
Ha.WebApp.Configure.MySensorsNodeRemovePopup = function () {
    $("#configure_driver_mysensorsremovenode_popup").popup("open")
};
Ha.WebApp.Configure.RemoveModule = function (d, a) {
    Ha.Data.ServiceCall("Config/Driver/" + d + "/RemoveModule/" + a + "/", null, "POST", function (a) {
    })
};
Ha.WebApp.Configure.DriverModuleListViewItems = function (d, a) {
    var b = "";
    Ha.Data.ServiceCall("Config/Module/List/", null, "GET", function (e) {
        Ha.Data.Modules = e.Modules;
        for (m = 0; m < Ha.Data.Modules.length; m++)if (e = Ha.Data.Modules[m], e.Domain == d) {
            var f = "" != e.Description ? e.Description : e.DeviceType, f = f + (" (" + e.Address + ")");
            b += '<option data-context-domain="' + e.Domain + '" data-context-value="' + e.Address + '">' + f + "</option>"
        }
        null != a && a(b)
    })
};
Ha.WebApp.Configure.InitWebinterface = function () {
    $("#configure_webinterface_http_port").unbind("change");
    Ha.Data.ServiceCall("Config/Webinterface/GetHttpPort", null, "GET", function (d) {
        $("#configure_webinterface_http_port").val(d)
    });
    $("#configure_webinterface_http_port").on("change", function (d) {
        Ha.Data.ServiceCall("Config/Webinterface/SetHttpPort/" + $("#configure_webinterface_http_port").val(), null, "POST", function (a) {
            $("#configure_webinterface_http_port").val(a)
        })
    });
    $("#configure_webinterface_ssl_port").unbind("change");
    Ha.Data.ServiceCall("Config/Webinterface/GetSslPort", null, "GET", function (d) {
        $("#configure_webinterface_ssl_port").val(d)
    });
    $("#configure_webinterface_ssl_port").on("change", function (d) {
        Ha.Data.ServiceCall("Config/Webinterface/SetSslPort/" + $("#configure_webinterface_ssl_port").val(), null, "POST", function (a) {
            $("#configure_webinterface_ssl_port").val(a)
        })
    });
    $("#configure_webinterface_forcessl").unbind("slidestop");
    Ha.Data.ServiceCall("Config/Webinterface/GetForceSsl", null, "GET", function (d) {
        $("#configure_webinterface_forcessl").val(d).slider("refresh")
    });
    $("#configure_webinterface_forcessl").on("slidestop", function (d) {
        Ha.Data.ServiceCall("Config/Webinterface/SetForceSsl/" + $("#configure_webinterface_forcessl").val(), null, "POST", function (a) {
            $("#configure_webinterface_forcessl").val(a).slider("refresh")
        })
    });
    $("#add_user_button").unbind("click");
    $("#add_user_button").on("click", function (d) {
        Ha.Data.ServiceCall("Config/Webinterface/AddUser/" + $("#add_user_name").val(), $("#add_user_password").val(), "POST", function (a) {
            "1" == a ? ($("#add_user_name").val(""), $("#add_user_password").val("")) :
                alert("Error ading new user. The user " + $("#add_user_name").val() + " already exist!")
        })
    });
    $("#user_remove_popup").unbind("popupbeforeposition");
    $("#user_remove_popup").on("popupbeforeposition", function (d) {
        Ha.WebApp.Configure.WebinterfaceRemoveUserViewItems(function (a) {
            $("#user_remove").empty();
            $("#user_remove").append(a);
            $("#user_remove").selectmenu("refresh")
        })
    })
};
Ha.WebApp.Configure.WebinterfaceRemoveUserViewItems = function (d) {
    var a = "";
    Ha.Data.ServiceCall("Config/Webinterface/UserList/", null, "GET", function (b) {
        users = b;
        for (m = 0; m < users.length; m++)b = users[m], "admin" != b.Username && (a += '<option data-context-value="' + b.Username + '">' + b.Username + "</option>");
        null != d && d(a)
    })
};
$("#user_remove_button").unbind("click");
$("#user_remove_button").on("click", function (d) {
    d = $("#user_remove").find(":selected").attr("data-context-value");
    Ha.Data.ServiceCall("Config/Webinterface/RemoveUser/" + d, null, "POST", null)
});
Ha.WebApp.Configure.AutomationRenderGroups = function () {
    $("#config_automation_groupslist").empty();
    for (var d = '<li data-role="list-divider">Automation groups</li>', a = 0; a < Ha.Data.AutomationGroups.length; a++)group = Ha.Data.AutomationGroups[a], d += '<li data-group-name="' + group.GroupName + '"><a href="#page_automation_automationlist" data-transition="slide">' + group.GroupName + '<span class="ui-li-count">' + group.Programs.length + "</span></a></li>";
    $("#config_automation_groupslist").append(d);
    $("#config_automation_groupslist li").bind("click",
        function () {
            $("#config_automation_groupslist").attr("selected-group-name", $(this).attr("data-group-name"))
        });
    $("#config_automation_groupslist").listview("refresh")
};
Ha.WebApp.Configure.AutomationReloadGroups = function () {
    Ha.Data.ServiceCall("Config/AutomationGroup/List", null, "GET", function (d) {
        Ha.Data.AutomationGroups = d;
        Ha.WebApp.Configure.AutomationRenderGroups()
    })
};
Ha.WebApp.Configure.InitAutomationGroups = function () {
    Ha.WebApp.Configure.AutomationReloadGroups();
    $("#group_automation_new_button").unbind("click");
    $("#group_automation_new_button").bind("click", function (d) {
        Ha.WebApp.Configure.AutomationGroupAdd($("#group_automation_new_name").val())
    })
};
Ha.WebApp.Configure.AutomationGroupAdd = function (d) {
    Ha.Data.ServiceCall("Config/AutomationGroup/Add", d, "POST", function (a) {
        Ha.WebApp.Configure.AutomationReloadGroups();
        $("#group_automation_new_name").val("")
    })
};
Ha.WebApp.Configure.RenderAutomationList = function (d) {
    selectedGroupName = $("#config_automation_groupslist").attr("selected-group-name");
    $("#config_automation_automationlistname").val(selectedGroupName);
    $("#config_automation_automationlist").empty();
    for (var a = '<li data-role="list-divider">Program list</li>', b = 0; b < Ha.Data.AutomationGroups.length; b++) {
        var e = Ha.Data.AutomationGroups[b];
        if (e.GroupName == selectedGroupName)for (var f = 0; f < e.Programs.length; f++)var g = e.Programs[f], a = a + ('<li data-program-id="' +
            g.ProgramId + '" data-icon="' + (g.Enabled ? "check" : "forward") + '">'), a = a + '<a href="#page_automation_automationprogramparam" data-transition="slide">', a = a + ("<h2>" + g.Name + "</h2>"), a = a + ("<p><b>Cron:</b> " + g.CronExpression + "</p>"), a = a + '<p class="ui-li-aside"><strong>4:48</strong>PM</p>', a = a + "</a>", a = a + ("<a href=\"javascript:Ha.WebApp.Configure.AutomationProgramToggleEnabled('" + g.ProgramId + "')\" >"), a = a + (g.Enabled ? "Tap to DISABLE program" : "Tap to ENABLE program"), a = a + "</a>", a = a + "</li>"
    }
    $("#config_automation_automationlist").append(a);
    $("#config_automation_automationlist").listview("refresh");
    $("#config_automation_automationlist li").unbind("click");
    $("#config_automation_automationlist li").bind("click", function () {
        $("#config_automation_automationlist").attr("data-program-id", $(this).attr("data-program-id"))
    });
    null != d && d()
};
Ha.WebApp.Configure.ReloadAutomationList = function (d) {
    Ha.Data.ServiceCall("Config/AutomationGroup/List", null, "GET", function (a) {
        Ha.Data.AutomationGroups = a;
        Ha.WebApp.Configure.RenderAutomationList(d)
    })
};
Ha.WebApp.Configure.GetProgramById = function (d) {
    for (var a = 0; a < Ha.Data.AutomationGroups.length; a++)for (var b = Ha.Data.AutomationGroups[a], e = 0; e < b.Programs.length; e++) {
        var f = b.Programs[e];
        if (f.ProgramId == d)return f
    }
    return null
};
Ha.WebApp.Configure.AutomationProgramToggleEnabled = function (d) {
    var a = Ha.WebApp.Configure.GetProgramById(d);
    a.Enabled = !a.Enabled;
    var b = 0;
    a.Enabled && (b = 1);
    Ha.Data.ServiceCall("Config/AutomationProgram/" + d + "/SetEnabled/" + b, null, "POST", function (a) {
        Ha.WebApp.Configure.ReloadAutomationList()
    })
};
Ha.WebApp.Configure.InitAutomationList = function () {
    $("#config_automation_automationlistname").unbind("change");
    $("#config_automation_automationlistname").change(function () {
        selectedGroupName = $("#config_automation_groupslist").attr("selected-group-name");
        Ha.Data.ServiceCall("Config/AutomationGroup/Rename/" + selectedGroupName, $("#config_automation_automationlistname").val(), "POST", function (d) {
            $("#config_automation_groupslist").attr("selected-group-name", $("#config_automation_automationlistname").val())
        })
    });
    $("#automationlist_automationgroup_delete_button").unbind("click");
    $("#automationlist_automationgroup_delete_button").bind("click", function (d) {
        selectedGroupName = $("#config_automation_groupslist").attr("selected-group-name");
        Ha.Data.ServiceCall("Config/AutomationGroup/Delete/" + selectedGroupName, null, "POST", function (a) {
            $.mobile.changePage($("#page_automation_automationgroups"), {transition: "reverse"})
        })
    });
    $("#automationlist_automationgroup_addprogram_button").unbind("click");
    $("#automationlist_automationgroup_addprogram_button").bind("click",
        function (d) {
            selectedGroupName = $("#config_automation_groupslist").attr("selected-group-name");
            d = {Name: "", CronExpression: ""};
            d.Name = $("#automationlist_automationgroup_addprogram_programname").val();
            d.CronExpression = $("#automationlist_automationgroup_addprogram_cron").val();
            Ha.Data.ServiceCall("Config/AutomationGroup/AddProgram/" + selectedGroupName, JSON.stringify(d), "POST", function (a) {
                Ha.WebApp.Configure.ReloadAutomationList(function (a) {
                    $("#automationlist_automationgroup_addprogram_programname").val("");
                    $("#automationlist_automationgroup_addprogram_cron").val("");
                    a = $("#config_automation_automationlist li").last().attr("data-program-id");
                    $("#config_automation_automationlist").attr("data-program-id", a);
                    $.mobile.changePage($("#page_automation_automationprogramparam"), {transition: "slide"})
                })
            })
        });
    Ha.WebApp.Configure.ReloadAutomationList()
};
Ha.WebApp.Configure.InitProgramParam = function () {
    var d = $("#config_automation_automationlist").attr("data-program-id");
    Ha.Data.ServiceCall("Config/AutomationProgram/" + d + "/List/", null, "GET", function (a) {
        Ha.Data.AutomationProgram = a;
        $("#config_automation_param_programname").val(Ha.Data.AutomationProgram.Name);
        $("#config_automation_param_cron").val(Ha.Data.AutomationProgram.CronExpression);
        $("#config_automation_param_enabled").unbind("slidestop");
        Ha.Data.AutomationProgram.Enabled ? $("#config_automation_param_enabled").val(1).slider("refresh") :
            $("#config_automation_param_enabled").val(0).slider("refresh");
        $("#config_automation_param_enabled").on("slidestop", function (a) {
            Ha.Data.ServiceCall("Config/AutomationProgram/" + d + "/SetEnabled/" + $("#config_automation_param_enabled").val(), null, "POST", function (a) {
                $("#config_automation_param_enabled").val(a).slider("refresh")
            })
        })
    });
    $("#config_automation_param_programname").unbind("change");
    $("#config_automation_param_programname").change(function () {
        Ha.Data.ServiceCall("Config/AutomationProgram/" + Ha.Data.AutomationProgram.ProgramId +
            "/Rename/" + $("#config_automation_param_programname").val(), null, "POST", function (a) {
            $("#config_automation_automationlist").attr("data-program-id", $("#config_automation_param_programname").val())
        })
    });
    $("#config_automation_param_cron").unbind("change");
    $("#config_automation_param_cron").change(function () {
        Ha.Data.ServiceCall("Config/AutomationProgram/" + Ha.Data.AutomationProgram.ProgramId + "/SetCron/" + $("#config_automation_param_cron").val(), null, "POST", function (a) {
        })
    });
    $("#page_automation_automationprogram_delete_button").unbind("click");
    $("#page_automation_automationprogram_delete_button").bind("click", function (a) {
        Ha.Data.ServiceCall("Config/AutomationProgram/" + Ha.Data.AutomationProgram.ProgramId + "/Delete/", null, "POST", function (a) {
            $.mobile.changePage($("#page_automation_automationlist"), {transition: "reverse"})
        })
    })
};
Ha.WebApp.Configure.csharpEditor = null;
Ha.WebApp.Configure.InitProgram = function () {
    var d = $("#config_automation_automationlist").attr("data-program-id");
    Ha.Data.ServiceCall("Config/AutomationProgram/" + d + "/List/", null, "GET", function (a) {
        Ha.Data.AutomationProgram = a;
        null != Ha.WebApp.Configure.csharpEditor ? Ha.WebApp.Configure.csharpEditor.setValue(Ha.Data.AutomationProgram.SourceCode) : ($("#automation_program_script").val(Ha.Data.AutomationProgram.SourceCode), Ha.WebApp.Configure.csharpEditor = CodeMirror.fromTextArea(document.getElementById("automation_program_script"),
                {
                    parserfile: ["/js/codemirror-4.5/tokenizecsharp.js", "/js/codemirror-4.5/parsecsharp.js"],
                    stylesheet: "/css/codemirror-4.5/csharpcolors.css",
                    path: "/js/codemirror-4.5/",
                    lineNumbers: !0,
                    matchBrackets: !0,
                    mode: "text/x-csharp"
                }))
    })
};
Ha.WebApp.Configure.AutomationProgramUpdate = function () {
    null != Ha.WebApp.Configure.csharpEditor && (Ha.Data.AutomationProgram.SourceCode = Ha.WebApp.Configure.csharpEditor.getValue());
    var d = $("#config_automation_automationlist").attr("data-program-id");
    Ha.Data.ServiceCall("Config/AutomationProgram/" + d + "/Update/", JSON.stringify(Ha.Data.AutomationProgram), "POST", function (a) {
        if (0 != a.length) {
            msg = "";
            for (var b = 0; b < a.length; b++)err = a[b], msg += "Error " + err.ErrorNumber + " in line " + err.Line + " column " + err.Column +
                ", " + err.ErrorMessage + "<br>";
            $("#program_error_message_text").html("<h3>Errors:</h3><i>" + msg + '</i><h3 style="color:red;font-weight:bold">Program disabled, fix errors first.</h3>');
            $("#program_error_message").popup().popup("open")
        }
    })
};
Ha.WebApp.Configure.InitGeneralSettings = function () {
};
Ha.WebApp.Configure.InitSmsinterface = function () {
    $("#configure_smsinterface_enabled").unbind("slidestop");
    Ha.Data.ServiceCall("Config/Smsinterface/GetEnabled", null, "GET", function (d) {
        $("#configure_smsinterface_enabled").val(d).slider("refresh")
    });
    $("#configure_smsinterface_enabled").on("slidestop", function (d) {
        Ha.Data.ServiceCall("Config/Smsinterface/SetEnabled/" + $("#configure_smsinterface_enabled").val(), null, "POST", function (a) {
            $("#configure_smsinterface_enabled").val(a).slider("refresh")
        })
    });
    $("#configure_smsinterface_port").unbind("change");
    Ha.Data.ServiceCall("Config/Smsinterface/GetPort", null, "GET", function (d) {
        $("#configure_smsinterface_port").val(d)
    });
    $("#configure_smsinterface_port").on("change", function (d) {
        Ha.Data.ServiceCall("Config/Smsinterface/SetPort/" + $("#configure_smsinterface_port").val(), null, "POST", function (a) {
            $("#configure_smsinterface_port").val(a)
        })
    });
    $("#configure_smsinterface_alowed_sender").unbind("change");
    Ha.Data.ServiceCall("Config/Smsinterface/GetAlowedSender", null, "GET", function (d) {
        $("#configure_smsinterface_alowed_sender").val(d)
    });
    $("#configure_smsinterface_alowed_sender").on("change", function (d) {
        Ha.Data.ServiceCall("Config/Smsinterface/SetAlowedSender/" + $("#configure_smsinterface_alowed_sender").val(), null, "POST", function (a) {
            $("#configure_smsinterface_alowed_sender").val(a)
        })
    });
    $("#configure_smsinterface_debug").unbind("slidestop");
    Ha.Data.ServiceCall("Config/Smsinterface/GetDebugMode", null, "GET", function (d) {
        $("#configure_smsinterface_debug").val(d).slider("refresh")
    });
    $("#configure_smsinterface_debug").on("slidestop", function (d) {
        Ha.Data.ServiceCall("Config/Smsinterface/SetDebugMode/" +
            $("#configure_smsinterface_debug").val(), null, "POST", function (a) {
            $("#configure_smsinterface_debug").val(a).slider("refresh")
        })
    });
    $("#add_sms_shortcut").unbind("click");
    $("#add_sms_shortcut").on("click", function (d) {
        Ha.Data.ServiceCall("Config/Smsinterface/Add/" + $("#sms_shortcut").val(), $("#sms_comamnd").val(), "POST", function (a) {
            "1" == a ? ($("#sms_shortcut").val(""), $("#sms_comamnd").val("")) : alert("Error ading new user. The shortcut " + $("#sms_shortcut").val() + " already exist!")
        })
    });
    $("#sms_shotcut_remove_popup").unbind("popupbeforeposition");
    $("#sms_shotcut_remove_popup").on("popupbeforeposition", function (d) {
        Ha.WebApp.Configure.SmsinterfaceRemoveShortcutViewItems(function (a) {
            $("#sms_shortcut_remove").empty();
            $("#sms_shortcut_remove").append(a);
            $("#sms_shortcut_remove").selectmenu("refresh")
        })
    });
    $("#sms_shortcut_button").unbind("click");
    $("#sms_shortcut_button").on("click", function (d) {
        d = $("#sms_shortcut_remove").find(":selected").attr("data-context-value");
        Ha.Data.ServiceCall("Config/Smsinterface/Remove/" + d, null, "POST", null)
    })
};
Ha.WebApp.Configure.SmsinterfaceRemoveShortcutViewItems = function (d) {
    var a = "";
    Ha.Data.ServiceCall("Config/Smsinterface/List/", null, "GET", function (b) {
        users = b;
        for (m = 0; m < users.length; m++)b = users[m], a += '<option data-context-value="' + b.Shortcut + '">' + b.Shortcut + " => " + b.Command + "</option>";
        null != d && d(a)
    })
};
Ha.WebApp.Configure.UpdateResistor = function (d, a) {
    var b = "configure_gpio_" + d + "_resistor";
    "0" == a ? ($("#" + b + "_off").prop("checked", !0), $("#" + b + "_pull_up").prop("checked", !1), $("#" + b + "_pull_down").prop("checked", !1)) : "2" == a ? ($("#" + b + "_off").prop("checked", !1), $("#" + b + "_pull_up").prop("checked", !0), $("#" + b + "_pull_down").prop("checked", !1)) : "1" == a && ($("#" + b + "_off").prop("checked", !1), $("#" + b + "_pull_up").prop("checked", !1), $("#" + b + "_pull_down").prop("checked", !0));
    $("input:radio[name=" + b + "]").checkboxradio("refresh")
};
Ha.WebApp.Configure.UpdateDirection = function (d, a) {
    var b = "configure_gpio_" + d + "_direction", e = "configure_gpio_" + d + "_resistor_group", f = "configure_gpio_" + d + "_resistor";
    "0" == a ? ($("#" + b + "_input").prop("checked", !0), $("#" + b + "_output").prop("checked", !1), $("[id=" + e + "]").each(function () {
            $(this).show()
        }), $("input:radio[name=" + f + "]").unbind("click"), Ha.Data.ServiceCall("Config/Driver/RPiGPIO/GetPinProperty/" + d + "/GPIOResistor/", null, "GET", function (a) {
            Ha.WebApp.Configure.UpdateResistor(d, a)
        }), $("input:radio[name=" +
            f + "]").on("click", function () {
            Ha.Data.ServiceCall("Config/Driver/RPiGPIO/SetPinProperty/" + d + "/GPIOResistor/" + $("input[name=" + f + "]:checked").val(), null, "POST", function (a) {
                Ha.WebApp.Configure.UpdateResistor(d, a)
            })
        })) : ($("#" + b + "_input").prop("checked", !1), $("#" + b + "_output").prop("checked", !0), $("[id=" + e + "]").each(function () {
            $(this).hide()
        }));
    $("input:radio[name=" + b + "]").checkboxradio("refresh")
};
Ha.WebApp.Configure.UpdateEnabled = function (d, a) {
    var b = "configure_gpio_" + d + "_enabled_group", e = "#configure_driver_rpigpio_" + d + "_enable", f = "configure_gpio_" + d + "_direction";
    $(e).val(a).slider("refresh");
    "0" != $(e).val() ? ($("[id=" + b + "]").each(function () {
            $(this).show()
        }), $("input:radio[name=" + f + "]").unbind("click"), Ha.Data.ServiceCall("Config/Driver/RPiGPIO/GetPinProperty/" + d + "/IsOutput/", null, "GET", function (a) {
            Ha.WebApp.Configure.UpdateDirection(d, a)
        }), $("input:radio[name=" + f + "]").on("click", function () {
            Ha.Data.ServiceCall("Config/Driver/RPiGPIO/SetPinProperty/" +
                d + "/IsOutput/" + $("input[name=" + f + "]:checked").val(), null, "POST", function (a) {
                Ha.WebApp.Configure.UpdateDirection(d, a)
            })
        })) : $("[id=" + b + "]").each(function () {
            $(this).hide()
        })
};
Ha.WebApp.Configure.InitRPiGPIOPin = function (d) {
    var a = "#configure_driver_rpigpio_" + d + "_enable";
    $(a).unbind("slidestop");
    Ha.Data.ServiceCall("Config/Driver/RPiGPIO/GetPinProperty/" + d + "/Enabled/", null, "GET", function (a) {
        Ha.WebApp.Configure.UpdateEnabled(d, a)
    });
    $(a).on("slidestop", function (b) {
        Ha.Data.ServiceCall("Config/Driver/RPiGPIO/SetPinProperty/" + d + "/Enabled/" + $(a).val() + "/", null, "POST", function (a) {
            Ha.WebApp.Configure.UpdateEnabled(d, a)
        })
    })
};
Ha.WebApp.Configure.InitRPiGPIOPins = function (d) {
    Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_03");
    Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_05");
    Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_07");
    Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_08");
    Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_10");
    Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_11");
    Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_12");
    Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_13");
    Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_15");
    Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_16");
    Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_18");
    Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_19");
    Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_21");
    Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_22");
    Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_23");
    Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_24");
    Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_26");
    "0" == d && ($("[id=gpio_pin_group2]").each(function () {
        $(this).hide()
    }), $("[id=gpio_pin_group3]").each(function () {
        $(this).hide()
    }));
    "1" == d ? ($("[id=gpio_pin_group2]").each(function () {
            $(this).show()
        }),
            $("[id=gpio_pin_group3]").each(function () {
                $(this).hide()
            }), Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P5_03"), Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P5_04"), Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P5_05"), Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P5_06")) : "2" == d && ($("[id=gpio_pin_group2]").each(function () {
            $(this).hide()
        }), $("[id=gpio_pin_group3]").each(function () {
            $(this).show()
        }), Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_29"), Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_31"), Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_32"),
            Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_33"), Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_35"), Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_36"), Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_37"), Ha.WebApp.Configure.InitRPiGPIOPin("Pin_P1_40"))
};
Ha.WebApp.Configure.InitRPiGPIOEnabled = function (d) {
    $("#configure_driver_rpigpio_enabled").val(d).slider("refresh");
    "0" != $("#configure_driver_rpigpio_enabled").val() ? ($("[id=configure_driver_rpigpiooptions]").each(function () {
            $(this).show()
        }), $("#configure_driver_rpigpio_debug").unbind("slidestop"), Ha.Data.ServiceCall("Config/Driver/RPiGPIO/GetDebugMode/", null, "GET", function (a) {
            $("#configure_driver_rpigpio_debug").val(a).slider("refresh")
        }), $("#configure_driver_rpigpio_debug").on("slidestop", function (a) {
            Ha.Data.ServiceCall("Config/Driver/RPiGPIO/SetDebugMode/" +
                $("#configure_driver_rpigpio_debug").val() + "/", null, "POST", function (a) {
                $("#configure_driver_rpigpio_debug").val(a).slider("refresh")
            })
        }), $("#configure_driver_rpigpio_revision").unbind("change"), Ha.Data.ServiceCall("Config/Driver/RPiGPIO/GetRevision/", null, "GET", function (a) {
            $("#configure_driver_rpigpio_revision").val(a);
            $("#configure_driver_rpigpio_revision").selectmenu("refresh");
            Ha.WebApp.Configure.InitRPiGPIOPins(a)
        }), $("#configure_driver_rpigpio_revision").on("change", function (a) {
            Ha.Data.ServiceCall("Config/Driver/RPiGPIO/SetRevision/" +
                $("#configure_driver_rpigpio_revision").val(), null, "POST", function (a) {
                $("#configure_driver_rpigpio_revision").val(a);
                $("#configure_driver_rpigpio_revision").selectmenu("refresh");
                Ha.WebApp.Configure.InitRPiGPIOPins(a)
            })
        })) : $("[id=configure_driver_rpigpiooptions]").each(function () {
            $(this).hide()
        })
};
Ha.WebApp.Configure.InitRPiGPIODriver = function () {
    $("#configure_driver_rpigpio_enabled").unbind("slidestop");
    Ha.Data.ServiceCall("Config/Driver/RPiGPIO/GetIsEnabled/", null, "GET", function (d) {
        Ha.WebApp.Configure.InitRPiGPIOEnabled(d)
    });
    $("#configure_driver_rpigpio_enabled").on("slidestop", function (d) {
        Ha.Data.ServiceCall("Config/Driver/RPiGPIO/SetIsEnabled/" + $("#configure_driver_rpigpio_enabled").val() + "/", null, "POST", function (a) {
            Ha.WebApp.Configure.InitRPiGPIOEnabled(a)
        })
    })
};
Ha.WebApp.Configure.Esp8266EasyIoTNodeAdd = function () {
    $("#configure_driver_esp8266easyiotaddnode_popup").popup("open");
    $("#configure_driver_esp8266easyiot_nodeid").html("");
    $("#configure_driver_esp8266easyiot_message").html("This operation will timeout in 30 seconds.");
    $("#configure_driver_esp8266easyiot_close_button").addClass("ui-disabled");
    Ha.Data.ServiceCall("Config/Driver/Esp8266/AddNode/", null, "POST", function (d) {
        0 != d ? ($("#configure_driver_esp8266easyiot_nodeid").html(d), $("#configure_driver_esp8266easyiot_message").html("node added.")) :
            ($("#configure_driver_esp8266easyiot_nodeid").html('<span style="color:red">timed out</span>'), $("#configure_driver_esp8266easyiot_message").html("Operation falied."));
        $("#configure_driver_esp8266easyiot_instructions").html("");
        $("#configure_driver_esp8266easyiot_close_button").removeClass("ui-disabled")
    })
};
Ha.WebApp.Configure.Esp8266EasyIoTNodeRemovePopup = function () {
    $("#configure_driver_esp8266easyiotremovenode_popup").popup("open")
};
Ha.WebApp.Configure.VirtualNodeAdd = function () {
    $("#configure_driver_virtual_addnode_popup").popup("open");
    $("#configure_driver_virtual_nodeid").html("");
    $("#configure_driver_virtual_message").html("");
    $("#configure_driver_virtual_close_button").addClass("ui-disabled");
    Ha.Data.ServiceCall("Config/Driver/Virtual/AddNode/", null, "POST", function (d) {
        0 != d ? ($("#configure_driver_virtual_nodeid").html(d), $("#configure_driver_virtual_message").html("node added.")) : ($("#configure_driver_virtual_nodeid").html('<span style="color:red">timed out</span>'),
                $("#configure_driver_virtual_message").html("Operation falied."));
        $("#configure_driver_virtual_instructions").html("");
        $("#configure_driver_virtual_close_button").removeClass("ui-disabled")
    })
};
Ha.WebApp.Configure.VirtualRemovePopup = function () {
    $("#configure_driver_virtual_removenode_popup").popup("open")
};
Ha.WebApp.Configure.MQTTClientConnectionListViewItems = function (d) {
    var a = "";
    Ha.Data.ServiceCall("Config/Driver/MQTTClient/ConnectionList", null, "GET", function (b) {
        for (m = 0; m < b.length; m++) {
            var e = b[m];
            displayname = "#" + e.Id + " - " + e.Hostname + ":" + e.Port;
            a += '<option data-context-connid="' + e.Id + '" value="' + e.Id + '" >' + displayname + "</option>"
        }
        null != d && d(a)
    })
};
Ha.WebApp.Configure.MQTTClientNodeListViewItems = function (d) {
    var a = "";
    Ha.Data.ServiceCall("Config/Driver/MQTTClient/NodeList", null, "GET", function (b) {
        for (m = 0; m < b.length; m++) {
            var e = b[m];
            a += '<option data-context-nodeid="' + e.Id + '" >' + e.Address + "</option>"
        }
        null != d && d(a)
    })
};
Ha.WebApp.Configure.MQTTClientFillProperty = function (d) {
    var a;
    a = '<li><div class="ui-corner-all custom-corners"><div class="ui-bar ui-bar-a">';
    a += "<h1>Property</h1>";
    a += "</div>";
    a += '<div class="ui-body ui-body-a">';
    a += '<div class="ui-grid-a">';
    a += '<div class="ui-block-a" style="padding-right:7.5px;padding-top:15px;width:30%;">Property</div>';
    a += '<div class="ui-block-b" style="padding-left:7.5px;width:70%;"><input data-ui-field="configure_driver_mqqtt_propertylist_property" type="text" value="' + d.Property +
        '" onchange="" style="font-size:11pt" -class="ui-disabled" /></div>';
    a += "</div>";
    a += "</div>";
    a += "</div>";
    a += '<div class="ui-corner-all custom-corners">';
    a += '<div class="ui-bar ui-bar-a">';
    a += "<h1>Publish</h1>";
    a += "</div>";
    a += '<div class="ui-body ui-body-a">';
    a += '<div class="ui-grid-a">';
    a += '<div class="ui-block-a" style="padding-right:7.5px;padding-top:15px;width:30%;">Topic</div>';
    a += '<div class="ui-block-b" style="padding-left:7.5px;width:70%;"><input data-ui-field="configure_driver_mqqtt_propertylist_publishtopic" type="text" value="' +
        d.PubTopic + '" onchange="" style="font-size:11pt" -class="ui-disabled" /></div>';
    a += "</div>";
    a += '<div class="ui-grid-a">';
    a += '<div class="ui-block-a" style="padding-right:7.5px;padding-top:15px;width:30%;">QoS</div>';
    a += '<div class="ui-block-b" style="padding-left:7.5px;width:70%;">';
    a += '<select data-ui-field="configure_driver_mqqtt_propertylist_publishqas" name="select-native-1" id="select-native-1">';
    a += "<option ";
    0 == d.PubQaS && (a += 'selected="selected"');
    a += 'value="0">QoS0, At most once</option>';
    a += "<option ";
    1 == d.PubQaS && (a += 'selected="selected"');
    a += 'value="1">QoS1, At least once</option>';
    a += "<option ";
    2 == d.PubQaS && (a += 'selected="selected"');
    a += 'value="2">QoS2, Exactly once</option>';
    a += "</select>";
    a += "</div>";
    a += "</div>";
    a += '<div class="ui-grid-solo">';
    a += '<div class="ui-block-a" ><label><input data-ui-field="configure_driver_mqqtt_propertylist_publishretain" type="checkbox" ';
    d.PubRetain && (a += 'checked="checked"');
    a += 'onchange="" style="font-size:11pt" -class="ui-disabled" />Retain</label></div>';
    a += "</div>";
    a += "</div>";
    a += "</div>";
    a += '<div class="ui-corner-all custom-corners">';
    a += '<div class="ui-bar ui-bar-a">';
    a += "<h1>Subscribe</h1>";
    a += "</div>";
    a += '<div class="ui-body ui-body-a">';
    a += '<div class="ui-grid-a">';
    a += '<div class="ui-block-a" style="padding-right:7.5px;padding-top:15px;width:30%;">Topic</div>';
    a += '<div class="ui-block-b" style="padding-left:7.5px;width:70%;"><input data-ui-field="configure_driver_mqqtt_propertylist_subscribetopic" type="text" value="' + d.SubTopic + '" onchange="" style="font-size:11pt" -class="ui-disabled" /></div>';
    a += "</div>";
    a += '<div class="ui-grid-a">';
    a += '<div class="ui-block-a" style="padding-right:7.5px;padding-top:15px;width:30%;">QoS</div>';
    a += '<div class="ui-block-b" style="padding-left:7.5px;width:70%;">';
    a += '<select data-ui-field="configure_driver_mqqtt_propertylist_subscribeqas" name="select-native-1" id="select2">';
    a += "<option ";
    0 == d.SubQaS && (a += 'selected="selected"');
    a += 'value="0">QoS0, At most once</option>';
    a += "<option ";
    1 == d.SubQaS && (a += 'selected="selected"');
    a += 'value="1">QoS1, At least once</option>';
    a += "<option ";
    2 == d.SubQaS && (a += 'selected="selected"');
    a += 'value="2">QoS2, Exactly once</option>';
    a += "</select>";
    a += "</div>";
    a += "</div>";
    a += "</div>";
    a += "</div>";
    a += "</li>";
    $("#configure_driver_mqqtt_propertylist").append(a)
};
Ha.WebApp.Configure.MQTTClientFillNode = function (d) {
    $("#configure_driver_mqqtt_propertylist").empty();
    for (var a = 0; a < d.PropertyList.length; a++)property = d.PropertyList[a], Ha.WebApp.Configure.MQTTClientFillProperty(property);
    $("#configure_driver_mqqtt_propertylist").trigger("create");
    $("#configure_driver_mqqtt_propertylist").listview().listview("refresh")
};
Ha.WebApp.Configure.InitMQTTClientDriver = function () {
    $("[id=configure_driver_mqttoptions]").each(function () {
        $(this).hide()
    });
    $("#configure_driver_mqtt_enabled").unbind("slidestop");
    Ha.Data.ServiceCall("Config/Driver/MQTTClient/GetIsEnabled/", null, "GET", function (d) {
        $("#configure_driver_mqtt_enabled").val(d).slider("refresh");
        "0" != $("#configure_driver_mqtt_enabled").val() ? $("[id=configure_driver_mqttoptions]").each(function () {
                $(this).show()
            }) : $("[id=configure_driver_mqttoptions]").each(function () {
                $(this).hide()
            })
    });
    $("#configure_driver_mqtt_enabled").on("slidestop", function (d) {
        Ha.Data.ServiceCall("Config/Driver/MQTTClient/SetIsEnabled/" + $("#configure_driver_mqtt_enabled").val() + "/", null, "POST", function (a) {
            $("#configure_driver_mqtt_enabled").val(a).slider("refresh");
            "0" != $("#configure_driver_mqtt_enabled").val() ? $("[id=configure_driver_mqttoptions]").each(function () {
                    $(this).show()
                }) : $("[id=configure_driver_mqttoptions]").each(function () {
                    $(this).hide()
                })
        })
    });
    $("#configure_driver_mqtt_debug").unbind("slidestop");
    Ha.Data.ServiceCall("Config/Driver/MQTTClient/GetDebugMode/", null, "GET", function (d) {
        $("#configure_driver_mqtt_debug").val(d).slider("refresh")
    });
    $("#configure_driver_mqtt_debug").on("slidestop", function (d) {
        Ha.Data.ServiceCall("Config/Driver/MQTTClient/SetDebugMode/" + $("#configure_driver_mqtt_debug").val() + "/", null, "POST", function (a) {
            $("#configure_driver_mqtt_debug").val(a).slider("refresh")
        })
    });
    $("#configure_driver_mqqt_addconnection_button").unbind("click");
    $("#configure_driver_mqqt_addconnection_button").on("click",
        function (d) {
            d = $("[data-ui-field=mqqt_connectionadd_hostname]").val();
            var a = $("[data-ui-field=mqqt_connectionadd_port]").val(), b = $("[data-ui-field=mqqt_connectionadd_username]").val(), e = $("[data-ui-field=mqqt_connectionadd_password]").val(), f = $("[data-ui-field=mqqt_connectionadd_clientid]").val();
            null != d && Ha.Data.ServiceCall("Config/Driver/MQTTClient/ConnectionAdd", JSON.stringify({
                hostname: d,
                port: a,
                username: b,
                password: e,
                clientid: f
            }), "POST", function (a) {
            })
        });
    $("#configure_driver_mqqtt_removeconn_popup").unbind("popupbeforeposition");
    $("#configure_driver_mqqtt_removeconn_popup").on("popupbeforeposition", function (d) {
        Ha.WebApp.Configure.MQTTClientConnectionListViewItems(function (a) {
            $("#configure_driver_mqqtt_removeconn").empty();
            $("#configure_driver_mqqtt_removeconn").append(a);
            $("#configure_driver_mqqtt_removeconn").selectmenu("refresh")
        })
    });
    $("#configure_driver_mqqtt_removeconn_button").unbind("click");
    $("#configure_driver_mqqtt_removeconn_button").on("click", function (d) {
        d = $("#configure_driver_mqqtt_removeconn").find(":selected").attr("data-context-connid");
        null != d && Ha.Data.ServiceCall("Config/Driver/MQTTClient/ConnectionRemove/" + d, null, "POST", function (a) {
        })
    });
    $("#configure_driver_mqqtt_editconn_popup").unbind("popupbeforeposition");
    $("#configure_driver_mqqtt_editconn_popup").on("popupbeforeposition", function (d) {
        Ha.WebApp.Configure.MQTTNodeTmp = null;
        Ha.WebApp.Configure.MQTTClientConnectionListViewItems(function (a) {
            var b = !1;
            $("#configure_driver_mqqtt_editconn").empty();
            $("#configure_driver_mqqtt_editconn").append(a);
            $("#configure_driver_mqqtt_editconn").selectmenu("refresh");
            a = $("#configure_driver_mqqtt_editconn").find(":selected");
            Ha.Data.ServiceCall("Config/Driver/MQTTClient/ConnectionGet/" + a.attr("data-context-connid"), null, "GET", function (a) {
                $("[data-ui-field=mqtt_connectionedit_hostname]").val(a.Hostname);
                $("[data-ui-field=mqtt_connectionedit_port]").val(a.Port);
                $("[data-ui-field=mqtt_connectionedit_username]").val(a.Username);
                $("[data-ui-field=mqtt_connectionedit_password]").val(a.Password);
                $("[data-ui-field=mqtt_connectionedit_clientid]").val(a.Clientid)
            });
            b = !0;
            $("#configure_driver_mqqtt_editconn").on("change", function (a) {
                b && (a = $("#configure_driver_mqqtt_editconn").find(":selected"), Ha.Data.ServiceCall("Config/Driver/MQTTClient/ConnectionGet/" + a.attr("data-context-connid"), null, "GET", function (a) {
                    $("[data-ui-field=mqtt_connectionedit_hostname]").val(a.Hostname);
                    $("[data-ui-field=mqtt_connectionedit_port]").val(a.Port);
                    $("[data-ui-field=mqtt_connectionedit_username]").val(a.Username);
                    $("[data-ui-field=mqtt_connectionedit_password]").val(a.Password);
                    $("[data-ui-field=mqtt_connectionedit_clientid]").val(a.Clientid)
                }))
            })
        })
    });
    $("#configure_driver_mqtt_editconn_button").unbind("click");
    $("#configure_driver_mqtt_editconn_button").on("click", function (d) {
        d = $("#configure_driver_mqqtt_editconn").find(":selected").attr("data-context-connid");
        if (null != d) {
            var a = $("[data-ui-field=mqtt_connectionedit_hostname]").val(), b = $("[data-ui-field=mqtt_connectionedit_port]").val(), e = $("[data-ui-field=mqtt_connectionedit_username]").val(), f = $("[data-ui-field=mqtt_connectionedit_password]").val(), g = $("[data-ui-field=mqtt_connectionedit_clientid]").val();
            Ha.Data.ServiceCall("Config/Driver/MQTTClient/ConnectionEdit", JSON.stringify({
                id: d,
                hostname: a,
                port: b,
                username: e,
                password: f,
                clientid: g
            }), "POST", function (a) {
            })
        }
    });
    $("#configure_driver_mqqtt_node_popup").unbind("popupbeforeposition");
    $("#configure_driver_mqqtt_node_popup").on("popupbeforeposition", function (d) {
        d = $("#configure_driver_mqqtt_node_popup").attr("mode");
        $("#configure_driver_mqqtt_node_nodelist").empty();
        $("#configure_driver_mqqtt_node_nodelist").selectmenu("refresh");
        $("#configure_driver_mqqtt_node_conectionlist").empty();
        $("#configure_driver_mqqtt_node_conectionlist").selectmenu("refresh");
        "add" == d ? ($("#configure_driver_mqqtt_node_popup_title").html("Add node"), $("#configure_driver_mqqtt_node_update_button").html("Add node"), $("#configure_driver_mqqtt_node_removeproperty_button").addClass("ui-disabled"), $("#configure_driver_mqqtt_node_addproperty_button").removeClass("ui-disabled"), $("#configure_driver_mqqtt_node_conectionlist").removeClass("ui-disabled"), $("#configure_driver_mqqtt_node_nodelist").addClass("ui-disabled"),
                $("#configure_driver_mqqtt_propertylist").removeClass("ui-disabled")) : "edit" == d ? ($("#configure_driver_mqqtt_node_popup_title").html("Edit node"), $("#configure_driver_mqqtt_node_update_button").html("Update node"), $("#configure_driver_mqqtt_node_removeproperty_button").addClass("ui-disabled"), $("#configure_driver_mqqtt_node_addproperty_button").removeClass("ui-disabled"), $("#configure_driver_mqqtt_node_conectionlist").addClass("ui-disabled"), $("#configure_driver_mqqtt_node_nodelist").removeClass("ui-disabled"),
                    $("#configure_driver_mqqtt_node_conectionlist").selectmenu("refresh"), $("#configure_driver_mqqtt_node_nodelist").unbind("change"), Ha.WebApp.Configure.MQTTClientNodeListViewItems(function (a) {
                    $("#configure_driver_mqqtt_node_nodelist").empty();
                    $("#configure_driver_mqqtt_node_nodelist").append(a);
                    $("#configure_driver_mqqtt_node_nodelist").selectmenu("refresh");
                    var b = !1;
                    a = $("#configure_driver_mqqtt_node_nodelist").find(":selected").attr("data-context-nodeid");
                    Ha.Data.ServiceCall("Config/Driver/MQTTClient/NodeGet/" +
                        a, null, "GET", function (a) {
                        $("#configure_driver_mqqtt_node_conectionlist").val(a.ConnectionId);
                        $("#configure_driver_mqqtt_node_conectionlist").selectmenu("refresh");
                        Ha.WebApp.Configure.MQTTClientFillNode(a)
                    });
                    $("#configure_driver_mqqtt_propertylist").removeClass("ui-disabled");
                    b = !0;
                    $("#configure_driver_mqqtt_node_nodelist").on("change", function (a) {
                        b && (a = $("#configure_driver_mqqtt_node_nodelist").find(":selected").attr("data-context-nodeid"), Ha.Data.ServiceCall("Config/Driver/MQTTClient/NodeGet/" + a,
                            null, "GET", function (a) {
                                $("#configure_driver_mqqtt_node_conectionlist").val(a.ConnectionId);
                                $("#configure_driver_mqqtt_node_conectionlist").selectmenu("refresh");
                                Ha.WebApp.Configure.MQTTClientFillNode(a)
                            }))
                    })
                })) : ($("#configure_driver_mqqtt_node_popup_title").html("Remove node"), $("#configure_driver_mqqtt_node_update_button").html("Remove node"), $("#configure_driver_mqqtt_node_removeproperty_button").addClass("ui-disabled"), $("#configure_driver_mqqtt_node_addproperty_button").addClass("ui-disabled"),
                    $("#configure_driver_mqqtt_node_conectionlist").addClass("ui-disabled"), $("#configure_driver_mqqtt_node_nodelist").removeClass("ui-disabled"), Ha.WebApp.Configure.MQTTClientNodeListViewItems(function (a) {
                    $("#configure_driver_mqqtt_node_nodelist").empty();
                    $("#configure_driver_mqqtt_node_nodelist").append(a);
                    $("#configure_driver_mqqtt_node_nodelist").selectmenu("refresh");
                    var b = !1;
                    a = $("#configure_driver_mqqtt_node_nodelist").find(":selected").attr("data-context-nodeid");
                    Ha.Data.ServiceCall("Config/Driver/MQTTClient/NodeGet/" +
                        a, null, "GET", function (a) {
                        $("#configure_driver_mqqtt_node_conectionlist").val(a.ConnectionId);
                        $("#configure_driver_mqqtt_node_conectionlist").selectmenu("refresh");
                        Ha.WebApp.Configure.MQTTClientFillNode(a)
                    });
                    $("#configure_driver_mqqtt_propertylist").addClass("ui-disabled");
                    b = !0;
                    $("#configure_driver_mqqtt_node_nodelist").on("change", function (a) {
                        b && (a = $("#configure_driver_mqqtt_node_nodelist").find(":selected").attr("data-context-nodeid"), Ha.Data.ServiceCall("Config/Driver/MQTTClient/NodeGet/" + a, null,
                            "GET", function (a) {
                                $("#configure_driver_mqqtt_node_conectionlist").val(a.ConnectionId);
                                $("#configure_driver_mqqtt_node_conectionlist").selectmenu("refresh");
                                Ha.WebApp.Configure.MQTTClientFillNode(a)
                            }))
                    })
                }));
        $("#configure_driver_mqqtt_propertylist").empty();
        Ha.WebApp.Configure.MQTTClientConnectionListViewItems(function (a) {
            $("#configure_driver_mqqtt_node_conectionlist").empty();
            $("#configure_driver_mqqtt_node_conectionlist").append(a);
            $("#configure_driver_mqqtt_node_conectionlist").selectmenu("refresh")
        });
        $("#configure_driver_mqqtt_node_update_button").unbind("click");
        $("#configure_driver_mqqtt_node_update_button").click(function () {
            var a = $("#configure_driver_mqqtt_node_popup").attr("mode");
            if ("add" == a) {
                var b = {
                    Id: 0,
                    ConnectionId: 0,
                    PropertyList: []
                }, a = $("#configure_driver_mqqtt_node_conectionlist").find(":selected");
                null != a && (b.ConnectionId = a.attr("data-context-connid"));
                $("#configure_driver_mqqtt_propertylist li").each(function (a) {
                    console.log(a + ": " + $(this).text());
                    a = $(this).find("[data-ui-field=configure_driver_mqqtt_propertylist_property]").val();
                    var d = $(this).find("[data-ui-field=configure_driver_mqqtt_propertylist_publishtopic]").val(), g = $(this).find("[data-ui-field=configure_driver_mqqtt_propertylist_publishqas]").val(), h = "false";
                    $(this).find("[data-ui-field=configure_driver_mqqtt_propertylist_publishretain]").is(":checked") && (h = "true");
                    var l = $(this).find("[data-ui-field=configure_driver_mqqtt_propertylist_subscribetopic]").val(), p = $(this).find("[data-ui-field=configure_driver_mqqtt_propertylist_subscribeqas]").val();
                    b.PropertyList.push({
                        Property: a,
                        PubTopic: d, PubQaS: g, PubRetain: h, SubTopic: l, SubQaS: p
                    });
                    Ha.Data.ServiceCall("Config/Driver/MQTTClient/NodeAdd", JSON.stringify(b), "POST", function (a) {
                    })
                })
            } else"edit" == a ? (b = {
                    Id: 0,
                    ConnectionId: 0,
                    PropertyList: []
                }, a = $("#configure_driver_mqqtt_node_conectionlist").find(":selected"), null != a && (b.ConnectionId = a.attr("data-context-connid")), a = $("#configure_driver_mqqtt_node_nodelist").find(":selected"), null != a && (b.Id = a.attr("data-context-nodeid")), $("#configure_driver_mqqtt_propertylist li").each(function (a) {
                    console.log(a +
                        ": " + $(this).text());
                    a = $(this).find("[data-ui-field=configure_driver_mqqtt_propertylist_property]").val();
                    var d = $(this).find("[data-ui-field=configure_driver_mqqtt_propertylist_publishtopic]").val(), g = $(this).find("[data-ui-field=configure_driver_mqqtt_propertylist_publishqas]").val(), h = "false";
                    $(this).find("[data-ui-field=configure_driver_mqqtt_propertylist_publishretain]").is(":checked") && (h = "true");
                    var l = $(this).find("[data-ui-field=configure_driver_mqqtt_propertylist_subscribetopic]").val(), p =
                        $(this).find("[data-ui-field=configure_driver_mqqtt_propertylist_subscribeqas]").val();
                    b.PropertyList.push({Property: a, PubTopic: d, PubQaS: g, PubRetain: h, SubTopic: l, SubQaS: p});
                    Ha.Data.ServiceCall("Config/Driver/MQTTClient/NodeEdit", JSON.stringify(b), "POST", function (a) {
                    })
                })) : (a = $("#configure_driver_mqqtt_node_nodelist").find(":selected"), a = a.attr("data-context-nodeid"), Ha.Data.ServiceCall("Config/Driver/MQTTClient/NodeRemove/" + a, null, "POST", function (a) {
                }))
        })
    })
};
Ha.WebApp.Configure.MQTTClientConenctionAdd = function () {
    $("[data-ui-field=mqqt_connectionadd_hostname]").val("");
    $("[data-ui-field=mqqt_connectionadd_port]").val("1883");
    $("[data-ui-field=mqqt_connectionadd_username]").val("");
    $("[data-ui-field=mqqt_connectionadd_password]").val("");
    $("[data-ui-field=mqqt_connectionadd_clientid]").val("");
    $("#configure_driver_mqqtt_addconn_popup").popup("open")
};
Ha.WebApp.Configure.MQTTClientConnectionRemovePopup = function () {
    $("#configure_driver_mqqtt_removeconn_popup").popup("open")
};
Ha.WebApp.Configure.MQTTClientConnectionEditPopup = function () {
    $("#configure_driver_mqqtt_editconn_popup").popup("open")
};
Ha.WebApp.Configure.MQTTNodeAdd = function () {
    $("#configure_driver_mqqtt_node_popup").attr("mode", "add");
    $("#configure_driver_mqqtt_node_popup").popup("open")
};
Ha.WebApp.Configure.MQTTNodeRemove = function () {
    $("#configure_driver_mqqtt_node_popup").attr("mode", "remove");
    $("#configure_driver_mqqtt_node_popup").popup("open")
};
Ha.WebApp.Configure.MQTTNodeEdit = function () {
    $("#configure_driver_mqqtt_node_popup").attr("mode", "edit");
    $("#configure_driver_mqqtt_node_popup").popup("open")
};
Ha.WebApp.Configure.MqttPropertyAdd = function () {
    Ha.WebApp.Configure.MQTTClientFillProperty({
        Property: "",
        PubTopic: "",
        PubQaS: 0,
        PubRetain: !1,
        SubTopic: "",
        SubQaS: 0
    });
    $("#configure_driver_mqqtt_propertylist").trigger("create");
    $("#configure_driver_mqqtt_propertylist").listview().listview("refresh");
    $("#configure_driver_mqqtt_propertylist input").unbind("focus");
    $("#configure_driver_mqqtt_propertylist input").focus(function () {
        var d = $(this).closest("li");
        "#E6E6FA" != d.css("background") && ($(this).attr("originalbackground",
            d.css("background")), d.css("background", "#E6E6FA"), null != Ha.WebApp.Configure.MQTTNodeTmp && Ha.WebApp.Configure.MQTTNodeTmp.css("background", $(this).attr("originalbackground")), Ha.WebApp.Configure.MQTTNodeTmp = d, setTimeout("$('#configure_driver_mqqtt_node_removeproperty_button').removeClass('ui-disabled')", 250))
    });
    $("#configure_driver_mqqtt_propertylist select").unbind("focus");
    $("#configure_driver_mqqtt_propertylist select").focus(function () {
        var d = $(this).closest("li");
        "#E6E6FA" != d.css("background") &&
        ($(this).attr("originalbackground", d.css("background")), d.css("background", "#E6E6FA"), null != Ha.WebApp.Configure.MQTTNodeTmp && Ha.WebApp.Configure.MQTTNodeTmp.css("background", $(this).attr("originalbackground")), Ha.WebApp.Configure.MQTTNodeTmp = d, setTimeout("$('#configure_driver_mqqtt_node_removeproperty_button').removeClass('ui-disabled')", 250))
    });
    $("#configure_driver_mqqtt_propertylist input").unbind("click");
    $("#configure_driver_mqqtt_propertylist input").click(function () {
        var d = $(this).closest("li");
        "#E6E6FA" != d.css("background") && ($(this).attr("originalbackground", d.css("background")), d.css("background", "#E6E6FA"), null != Ha.WebApp.Configure.MQTTNodeTmp && Ha.WebApp.Configure.MQTTNodeTmp.css("background", $(this).attr("originalbackground")), Ha.WebApp.Configure.MQTTNodeTmp = d, setTimeout("$('#configure_driver_mqqtt_node_removeproperty_button').removeClass('ui-disabled')", 250))
    })
};
Ha.WebApp.Configure.MqttPropertyRemove = function () {
    null != Ha.WebApp.Configure.MQTTNodeTmp && $("#configure_driver_mqqtt_propertylist").find(Ha.WebApp.Configure.MQTTNodeTmp).remove();
    Ha.WebApp.Configure.MQTTNodeTmp = null;
    setTimeout("$('#configure_driver_mqqtt_node_removeproperty_button').addClass('ui-disabled')", 250)
};
Ha.WebApp.Events = Ha.WebApp.Events || {};
Ha.WebApp.Events._statuspopupTimeout = null;
Ha.WebApp.Events.es = null;
Ha.WebApp.Events.InitializePage = function () {
    setTimeout(function () {
        Ha.WebApp.Events.SetupListener();
        $(window).bind("scroll resize", function () {
            $("#statuspopup").css("top", $(this).scrollTop())
        })
    }, 2E3)
};
Ha.WebApp.Events.SetupListener = function () {
    Ha.WebApp.Events.es = new EventSource("/Api/EasyIoT/Events/RealTime.EventStream/");
    Ha.WebApp.Events.es.onmessage = function (d) {
        var a = eval("[" + d.data + "]")[0];
        d = Ha.Data.Module.GetModuleByDomainAddress(a.Domain, a.Address);
        if (null != d) {
            var b = Ha.WebApp.Utility.GetModulePropertyByName(d, a.Property);
            Ha.WebApp.Utility.SetModulePropertyByName(d, a.Property, a.Value, a.Timestamp);
            Ha.WebApp.Control.SendEventToUi(d, a);
            "true" != b.DisableUINotification && (a = "", b = Ha.Data.Group.GetModuleGroup(d),
            null != b && (a = b.GroupName), b = Ha.WebApp.Control.GetWidgetUIData(d), d = {
                icon: b.icon,
                title: '<span style="color:gray;font-size:8pt;">' + a + "</span><br><b>" + d.Description + "</b><br>",
                text: b.status,
                timestamp: Ha.WebApp.Control.GetWidgetDateTime(b.timestamp)
            }, null != d && Ha.WebApp.Events.ShowEventPopup(d))
        }
    }
};
Ha.WebApp.Events.ShowEventPopup = function (d) {
    var a;
    a = '<table width="100%"><tr><td width="48" rowspan="2">' + ('<img src="' + d.icon + '" width="48">');
    a = a + '</td><td valign="top" align="left" style="color: black;">' + d.title;
    a += '</td><td align="right" style="font-size:12pt;color: black;">' + d.text + "</td></tr>";
    a += '<tr><td colspan="2" align="right"><span style="font-size:8pt;color: black;">' + d.timestamp + "</span>";
    a += "</td></tr></table>";
    $("#statuspopup").html(a);
    null != Ha.WebApp.Events._statuspopupTimeout ? clearTimeout(Ha.WebApp.Events._statuspopupTimeout) :
        ($("#statuspopup").css("display", ""), $("#statuspopup").animate({opacity: "0"}, 0, function () {
            $("#statuspopup").animate({right: "5px", opacity: "0.90"}, 300)
        }));
    Ha.WebApp.Events._statuspopupTimeout = setTimeout(function () {
        "none" != $("#statuspopup").css("display") && $("#statuspopup").animate({
            right: "-300px",
            opacity: "0.0"
        }, 300, function () {
            $("#statuspopup").css("display", "none")
        });
        Ha.WebApp.Events._statuspopupTimeout = null
    }, 5E3)
};
Ha.WebApp = Ha.WebApp || {};
Ha.WebApp.InitializePage = function () {
    $.ajaxSetup({cache: !1});
    $.mobile.ajaxFormsEnabled = !1;
    Ha.WebApp.Configure.InitPage();
    Ha.WebApp.Events.InitializePage();
    Ha.WebApp.Control.ReloadPage();
    $("[data-role=page]").on("pagebeforeshow", function (d) {
        "page_config" != this.id && ("page_groupmodules_groups" == this.id ? Ha.WebApp.Configure.ReloadGroups() : "page_groupmodules_groupmodules" == this.id ? Ha.WebApp.Configure.ReloadModules() : "page_config_drivers_mysensors" == this.id ? Ha.WebApp.Configure.InitMySensorsDriver() : "page_config_drivers" !=
                    this.id && ("page_config_drivers_mysensors" == this.id ? Ha.WebApp.Configure.InitMySensorsDriver() : "page_config_drivers_rpigpio" == this.id ? Ha.WebApp.Configure.InitRPiGPIODriver() : "page_config_drivers_esp8266easyiot" == this.id ? Ha.WebApp.Configure.InitEsp8266EasyIoTDriver() : "page_config_drivers_virtual" == this.id ? Ha.WebApp.Configure.InitVirtualDriver() : "page_config_drivers_mqtt" == this.id ? Ha.WebApp.Configure.InitMQTTClientDriver() : "page_control" == this.id ? Ha.WebApp.Control.ReloadPage() : "page_config_webinterface" ==
                                            this.id ? Ha.WebApp.Configure.InitWebinterface() : "page_config_smsinterface" == this.id ? Ha.WebApp.Configure.InitSmsinterface() : "page_automation_automationgroups" == this.id ? Ha.WebApp.Configure.InitAutomationGroups() : "page_automation_automationlist" == this.id ? Ha.WebApp.Configure.InitAutomationList() : "page_automation_automationprogramparam" == this.id ? Ha.WebApp.Configure.InitProgramParam() : "page_automation_automationprogram" == this.id ? Ha.WebApp.Configure.InitProgram() : "page_config_generalsettings" == this.id ? Ha.WebApp.Configure.InitGeneralSettings() :
                                                                        "page_control_chart" == this.id && Ha.WebApp.Control.InitChart()))
    })
};
