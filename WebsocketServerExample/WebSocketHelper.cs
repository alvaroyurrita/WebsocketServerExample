using System;
using Crestron.SimplSharpPro;                       	// For Basic SIMPL#Pro classes
using Crestron.SimplSharp;                          	// For Basic SIMPL# Classes
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Security.Cryptography.X509Certificates;
using System.Security.Authentication;
using Fleck;

namespace WebsocketServerExample
{
    public class WebSocketHelper
    {
        List<AudioLevel> RoomAudioLevels;
        List<IWebSocketConnection> allSockets = new List<IWebSocketConnection>();

        public WebSocketHelper(List<AudioLevel> RoomAudioLevels)
        {
            this.RoomAudioLevels = RoomAudioLevels;
            try
            {
                var Server = new WebSocketServer("wss://192.168.0.143:49620");

                Server.EnabledSslProtocols = SslProtocols.Tls12 | SslProtocols.None | SslProtocols.Default;
                Server.Certificate = new X509Certificate2("./Certificate/cp4-home.pfx","DGItech01862!");
                Server.SupportedSubProtocols = new[] { "Audio" };
                Server.Start(socket =>
                {
                    CrestronConsole.PrintLine("WebSocket started");

                    socket.OnError = obj =>
                    {
                        CrestronConsole.PrintLine(obj.Message);
                    };

                    socket.OnOpen = () =>
                    {
                        CrestronConsole.PrintLine("Socket Open");
                        CrestronConsole.PrintLine($"{socket.ConnectionInfo.Id}");
                        allSockets.Add(socket);
                    };

                    socket.OnClose = () =>
                    {
                        CrestronConsole.PrintLine("Socket Closed");
                        CrestronConsole.PrintLine($"{socket.ConnectionInfo.Id}");
                        allSockets.Remove(socket);
                    };

                    socket.OnMessage = Message =>
                    {
                        var msg = JsonConvert.DeserializeObject<AudioLevelMessage>(Message);
                        switch (msg.message)
                        {
                            case "GET":
                                socket.Send(JsonConvert.SerializeObject(RoomAudioLevels));
                                break;
                            case "POST":
                                RoomAudioLevels = msg.audioLevels;
                            //socket.Send(JsonConvert.SerializeObject(RoomAudioLevels));
                            allSockets.ForEach(c => c.Send(JsonConvert.SerializeObject(RoomAudioLevels)));
                                break;
                            default:
                                break;   
                        }
                    };
                });
            }
            catch (Exception e)
            {
                CrestronConsole.PrintLine(e.Message);
                CrestronConsole.PrintLine(e.StackTrace);
                CrestronConsole.PrintLine(e.Source);
            }
        }

        public void SendUpdate()
        {
            var message = JsonConvert.SerializeObject(RoomAudioLevels);
            allSockets.ForEach(c => c.Send(message));
        }
    }
}
