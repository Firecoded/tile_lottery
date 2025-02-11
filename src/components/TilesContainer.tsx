import { useState } from "react";
import Tile from "./Tile";

interface TileData {
    id: number;
    prize: string;
    image: string;
    isFlipped: boolean;
}

export default function TilesContainer() {
    const [tileConfig, setTileConfig] = useState(() => {
        const savedConfig = localStorage.getItem("tileConfig");
        return savedConfig
            ? (JSON.parse(savedConfig).map((tile: TileData) => ({ ...tile, isFlipped: false })) as TileData[])
            : [
                  { id: 1, prize: "Gold Coin", image: "🥇", isFlipped: false },
                  { id: 2, prize: "Silver Coin", image: "🥈", isFlipped: false },
                  { id: 3, prize: "Bronze Coin", image: "🥉", isFlipped: false },
                  { id: 4, prize: "Diamond", image: "💎", isFlipped: false },
                  { id: 5, prize: "Star", image: "⭐", isFlipped: false },
                  { id: 6, prize: "Gift Box", image: "🎁", isFlipped: false },
                  { id: 7, prize: "Treasure Chest", image: "🪙", isFlipped: false },
                  { id: 8, prize: "Crown", image: "👑", isFlipped: false },
                  { id: 9, prize: "Mystery Box", image: "❓", isFlipped: false },
                  { id: 10, prize: "Rocket", image: "🚀", isFlipped: false },
                  { id: 11, prize: "Heart", image: "❤️", isFlipped: false },
                  { id: 12, prize: "Lightning", image: "⚡", isFlipped: false },
                  { id: 13, prize: "Key", image: "🔑", isFlipped: false },
                  { id: 14, prize: "Shield", image: "🛡️", isFlipped: false },
                  { id: 15, prize: "Bag of Coins", image: "💰", isFlipped: false },
                  { id: 16, prize: "Medal", image: "🏅", isFlipped: false },
                  { id: 17, prize: "Fire", image: "🔥", isFlipped: false },
                  { id: 18, prize: "Gem", image: "💠", isFlipped: false },
                  { id: 19, prize: "Lucky Clover", image: "🍀", isFlipped: false },
                  { id: 20, prize: "Sun", image: "🌞", isFlipped: false },
                  { id: 21, prize: "Moon", image: "🌙", isFlipped: false },
                  { id: 22, prize: "Anchor", image: "⚓", isFlipped: false },
                  { id: 23, prize: "Bell", image: "🔔", isFlipped: false },
                  { id: 24, prize: "Sword", image: "🗡️", isFlipped: false },
              ];
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isShuffling, setShuffling] = useState(false);

    const flipTile = (id: number, isFlipped: boolean) => {
        setTileConfig(tileConfig.map((tile) => (tile.id === id ? { ...tile, isFlipped } : tile)));
    };

    const updateTilePrize = (id: number, prize: string) => {
        setTileConfig(tileConfig.map((tile) => (tile.id === id ? { ...tile, prize } : tile)));
    };

    const handleIsEditing = () => {
        setTileConfig(tileConfig.map((tile) => ({ ...tile, isFlipped: true })));
        setIsEditing(true);
    };

    const handleSave = () => {
        localStorage.setItem("tileConfig", JSON.stringify(tileConfig));
        setTileConfig(tileConfig.map((tile) => ({ ...tile, isFlipped: false })));
        setIsEditing(false);
    };

    const handleShuffle = () => {
        setShuffling(true);
        setTimeout(() => {
            setTileConfig((prevConfig) => {
                let shuffled = [...prevConfig];
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                return shuffled;
            });
            setShuffling(false);
        }, 500);
    };

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
            className="bg-black"
        >
            <div
                style={{
                    position: "relative",
                    width: "90%", // Make grid dynamic based on container
                }}
            >
                <div className="d-flex justify-content-end mb-2">
                    <button className="btn btn-secondary me-2" onClick={handleShuffle}>
                        Shuffle
                    </button>
                    <button className="btn btn-secondary" onClick={isEditing ? handleSave : handleIsEditing}>
                        {isEditing ? "Save" : "Edit"}
                    </button>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(8, 1fr)", // 8 columns
                        gridTemplateRows: "repeat(3, 1fr)", // 3 rows
                        gap: "1.2vw", // Dynamically adjusts based on screen size
                        justifyContent: "center",
                        width: "100%", // Make it responsive
                    }}
                >
                    {tileConfig.map((tile, index) => (
                        <Tile
                            key={tile.id}
                            data={tile}
                            flipTile={flipTile}
                            isEditing={isEditing}
                            updateTilePrize={updateTilePrize}
                            index={index}
                            isShuffling={isShuffling}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
