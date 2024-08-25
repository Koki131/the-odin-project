package com.battleships.pojo;


public class GameState {

    private String gameId;
    private User player1;
    private User player2;
    private String turn;
    private boolean shipHit;
    private boolean privateGameFull;

    public GameState() {

    }
    public GameState(String id) {
        this.gameId = id;
    }

    public GameState(User player1, User player2, String turn, boolean shipHit) {
        this.player1 = player1;
        this.player2 = player2;
        this.gameId = player1.getId();
        this.turn = turn;
        this.shipHit = shipHit;
    }

    public GameState(User player1) {
        this.player1 = player1;
        this.player2 = null;
        this.gameId = player1.getId();

    }


    public boolean isShipHit() {
        return shipHit;
    }

    public void setShipHit(boolean shipHit) {
        this.shipHit = shipHit;
    }

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public User getPlayer1() {
        return player1;
    }

    public void setPlayer1(User player1) {
        this.player1 = player1;
    }

    public User getPlayer2() {
        return player2;
    }

    public void setPlayer2(User player2) {
        this.player2 = player2;
    }

    public String getTurn() {
        return turn;
    }

    public void setTurn(String turn) {
        this.turn = turn;
    }

    public boolean getPrivateGameFull() {
        return privateGameFull;
    }

    public void setPrivateGameFull(boolean privateGameFull) {
        this.privateGameFull = privateGameFull;
    }

    @Override
    public String toString() {
        return "GameState{" +
                "gameId='" + gameId + '\'' +
                ", player1=" + player1 +
                ", player2=" + player2 +
                ", turn=" + turn +
                '}';
    }

}
