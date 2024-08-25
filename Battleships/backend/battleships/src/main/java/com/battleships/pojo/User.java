package com.battleships.pojo;

import java.util.HashMap;
import java.util.Map;

public class User {

    private String id;
    private Map<String, Boolean> board;

    private String gameId;
    private boolean rematch;

    public User() {
    }

    public User(String id) {
        this.board = new HashMap<>();
        this.id = id;
    }

    public User(String id, String gameId, boolean rematch) {
        this.id = id;
        this.gameId = gameId;
        this.rematch = rematch;
    }

    public Map<String, Boolean> getBoard() {
        return board;
    }

    public void setBoard(Map<String, Boolean> board) {
        this.board = board;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public boolean getRematch() {
        return rematch;
    }

    public void setRematch(boolean rematch) {
        this.rematch = rematch;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", gameId='" + gameId + '\'' +
                ", rematch=" + rematch +
                '}';
    }
}
