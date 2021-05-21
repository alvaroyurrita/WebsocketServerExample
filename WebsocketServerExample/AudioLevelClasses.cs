using System.Collections.Generic;
using Newtonsoft.Json;

namespace WebsocketServerExample
{
    public class AudioLevelMessage
    {
        public string message = "";
        public List<AudioLevel> audioLevels = new List<AudioLevel>() { new AudioLevel("") };

        public AudioLevelMessage(string msg)
        {
            this.message = msg;
        }
    }

    public class AudioLevel
    {
        [JsonProperty("name")]
        public string Name { get; }
        [JsonProperty("levelPercent")]
        public int LevelPercent { get; set; }
        [JsonProperty("isMuted")]
        public bool IsMuted { get; set; }

        public AudioLevel(string Name = "", int LevelPercent = 80, bool IsMuted = false)
        {
            this.Name = Name;
            this.LevelPercent = LevelPercent;
            this.IsMuted = IsMuted;
        }

    }
}
