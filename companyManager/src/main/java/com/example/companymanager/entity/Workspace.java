package com.example.companymanager.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Workspace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workspace_id")
    private Long workspaceId;

    private String name;


    //TODO This should be the color of the workspace, the user can self select the main workspace colors. Have to choose where this will be used.
    // Use the same cards to selectin workspace as UploadTHing uses
    private String color;


}
